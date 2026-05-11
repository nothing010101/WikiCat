import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, isAddress } from "viem";
import { base } from "viem/chains";
import {
  MINT_CONTRACT_ABI,
  WIKI_TOKEN_ABI,
  FOUNDER_NFT_ABI,
  CONTRACT_ADDRESSES,
} from "@/lib/contracts";

const client = createPublicClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL || "https://mainnet.base.org"),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address") as `0x${string}` | null;

  if (!address || !isAddress(address)) {
    return NextResponse.json(
      { success: false, error: "Valid wallet address required" },
      { status: 400 }
    );
  }

  try {
    const [slotsMinted, walletRemaining, wikiBalance, nftBalance] =
      await Promise.all([
        client.readContract({
          address: CONTRACT_ADDRESSES.mintContract,
          abi: MINT_CONTRACT_ABI,
          functionName: "walletSlots",
          args: [address],
        }),
        client.readContract({
          address: CONTRACT_ADDRESSES.mintContract,
          abi: MINT_CONTRACT_ABI,
          functionName: "walletRemaining",
          args: [address],
        }),
        client.readContract({
          address: CONTRACT_ADDRESSES.wikiToken,
          abi: WIKI_TOKEN_ABI,
          functionName: "balanceOf",
          args: [address],
        }),
        client.readContract({
          address: CONTRACT_ADDRESSES.founderNFT,
          abi: FOUNDER_NFT_ABI,
          functionName: "balanceOf",
          args: [address],
        }),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        address,
        slotsMinted: Number(slotsMinted),
        slotsRemaining: Number(walletRemaining),
        maxPerWallet: 30,
        wikiBalance: wikiBalance.toString(),
        wikiBalanceFormatted: (
          Number(wikiBalance) / 1e18
        ).toLocaleString(undefined, { maximumFractionDigits: 0 }),
        nftBalance: Number(nftBalance),
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
