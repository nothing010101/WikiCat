import { NextRequest, NextResponse } from "next/server";
import {
  createPublicClient,
  createWalletClient,
  http,
  isAddress,
  parseEther,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import { MINT_CONTRACT_ABI, CONTRACT_ADDRESSES } from "@/lib/contracts";

/**
 * Backend Relayer endpoint.
 *
 * NOTE: In this relayer pattern, the backend pays gas and mint cost.
 * The private key must have sufficient ETH balance on Base.
 *
 * For a user-pays model, use the frontend wagmi flow (MintSection.tsx) instead.
 *
 * POST /api/mint
 * Body: { recipient: string, quantity: number }
 */

const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL || "https://mainnet.base.org"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recipient, quantity } = body as {
      recipient: string;
      quantity: number;
    };

    // Validate inputs
    if (!recipient || !isAddress(recipient)) {
      return NextResponse.json(
        { success: false, error: "Invalid recipient address" },
        { status: 400 }
      );
    }
    if (!quantity || quantity < 1 || quantity > 30) {
      return NextResponse.json(
        { success: false, error: "Quantity must be 1–30" },
        { status: 400 }
      );
    }

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      return NextResponse.json(
        { success: false, error: "Relayer not configured (missing PRIVATE_KEY)" },
        { status: 503 }
      );
    }

    const account = privateKeyToAccount(privateKey as `0x${string}`);
    const walletClient = createWalletClient({
      account,
      chain: base,
      transport: http(
        process.env.NEXT_PUBLIC_RPC_URL || "https://mainnet.base.org"
      ),
    });

    // Pre-checks
    const mintInfo = await publicClient.readContract({
      address: CONTRACT_ADDRESSES.mintContract,
      abi: MINT_CONTRACT_ABI,
      functionName: "mintInfo",
    });
    const [price, , , remaining, , active] = mintInfo;

    if (!active) {
      return NextResponse.json(
        { success: false, error: "Mint is not active" },
        { status: 400 }
      );
    }
    if (Number(remaining) < quantity) {
      return NextResponse.json(
        {
          success: false,
          error: `Only ${remaining} slots remaining`,
        },
        { status: 400 }
      );
    }

    const totalCost = price * BigInt(quantity);

    // Simulate first
    await publicClient.simulateContract({
      address: CONTRACT_ADDRESSES.mintContract,
      abi: MINT_CONTRACT_ABI,
      functionName: "mint",
      args: [BigInt(quantity)],
      value: totalCost,
      account: account.address,
    });

    // Send transaction
    const txHash = await walletClient.writeContract({
      address: CONTRACT_ADDRESSES.mintContract,
      abi: MINT_CONTRACT_ABI,
      functionName: "mint",
      args: [BigInt(quantity)],
      value: totalCost,
    });

    // Wait for receipt
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
      confirmations: 1,
    });

    return NextResponse.json({
      success: true,
      data: {
        txHash,
        blockNumber: receipt.blockNumber.toString(),
        recipient,
        quantity,
        totalCost: totalCost.toString(),
        status: receipt.status,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
