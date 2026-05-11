import { NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { MINT_CONTRACT_ABI, CONTRACT_ADDRESSES } from "@/lib/contracts";

const client = createPublicClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL || "https://mainnet.base.org"),
});

export async function GET() {
  try {
    const mintInfo = await client.readContract({
      address: CONTRACT_ADDRESSES.mintContract,
      abi: MINT_CONTRACT_ABI,
      functionName: "mintInfo",
    });

    const ethCollected = await client.readContract({
      address: CONTRACT_ADDRESSES.mintContract,
      abi: MINT_CONTRACT_ABI,
      functionName: "totalEthCollected",
    });

    const [price, maxSlots, minted, remaining, maxPerWallet, active] = mintInfo;

    return NextResponse.json({
      success: true,
      data: {
        mintActive: active,
        mintPrice: price.toString(),
        mintPriceEth: "0.0011",
        maxSlots: Number(maxSlots),
        totalSlotsMinted: Number(minted),
        remainingSlots: Number(remaining),
        maxPerWallet: Number(maxPerWallet),
        totalEthCollected: ethCollected.toString(),
        progressPercent: ((Number(minted) / Number(maxSlots)) * 100).toFixed(2),
        contracts: {
          wikiToken: CONTRACT_ADDRESSES.wikiToken,
          founderNFT: CONTRACT_ADDRESSES.founderNFT,
          mintContract: CONTRACT_ADDRESSES.mintContract,
        },
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
