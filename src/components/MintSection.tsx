"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseEther, formatEther } from "viem";
import { Minus, Plus, Zap, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { MINT_CONTRACT_ABI, CONTRACT_ADDRESSES } from "@/lib/contracts";

const MINT_PRICE = 0.0011;
const MAX_PER_WALLET = 30;

export function MintSection() {
  const { address, isConnected } = useAccount();
  const [quantity, setQuantity] = useState(1);

  // Contract reads
  const { data: mintInfo, refetch: refetchMintInfo } = useReadContract({
    address: CONTRACT_ADDRESSES.mintContract,
    abi: MINT_CONTRACT_ABI,
    functionName: "mintInfo",
  });

  const { data: walletSlotsData, refetch: refetchWallet } = useReadContract({
    address: CONTRACT_ADDRESSES.mintContract,
    abi: MINT_CONTRACT_ABI,
    functionName: "walletSlots",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const mintActive = mintInfo ? mintInfo[5] : false;
  const remaining = mintInfo ? Number(mintInfo[3]) : 5000;
  const walletMinted = walletSlotsData ? Number(walletSlotsData) : 0;
  const walletLeft = MAX_PER_WALLET - walletMinted;
  const maxMintable = Math.min(walletLeft, remaining, MAX_PER_WALLET);

  // Contract write
  const { writeContract, data: txHash, isPending, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleMint = useCallback(() => {
    if (!isConnected || !mintActive) return;
    const cost = parseEther((MINT_PRICE * quantity).toFixed(6));
    writeContract({
      address: CONTRACT_ADDRESSES.mintContract,
      abi: MINT_CONTRACT_ABI,
      functionName: "mint",
      args: [BigInt(quantity)],
      value: cost,
    });
  }, [isConnected, mintActive, quantity, writeContract]);

  const handleSuccess = useCallback(() => {
    refetchMintInfo();
    refetchWallet();
    setQuantity(1);
  }, [refetchMintInfo, refetchWallet]);

  if (isSuccess && txHash) {
    setTimeout(handleSuccess, 2000);
  }

  const totalCost = (MINT_PRICE * quantity).toFixed(4);

  return (
    <section id="mint" className="py-20 px-4">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="wiki-card p-8 relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-radial from-wiki-yellow/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-wiki-yellow/10 border border-wiki-yellow/20 rounded-full px-4 py-1.5 mb-4">
                <div
                  className={`w-2 h-2 rounded-full ${mintActive ? "bg-wiki-green animate-pulse" : "bg-wiki-orange"}`}
                />
                <span className="text-wiki-yellow text-xs font-semibold uppercase tracking-widest">
                  {mintActive ? "Mint Live" : "Opening Soon"}
                </span>
              </div>

              <h2 className="text-3xl font-black text-white mb-2">
                Claim Your{" "}
                <span className="gradient-text">Founder Pass</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Each slot = 1 NFT + 1,000,000 $WIKI
              </p>
            </div>

            {/* Quantity selector */}
            <div className="mb-6">
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-3">
                Quantity (max {MAX_PER_WALLET}/wallet)
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl border border-wiki-border bg-wiki-card hover:border-wiki-yellow/40 hover:text-wiki-yellow transition-all flex items-center justify-center"
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>

                <div className="flex-1 text-center">
                  <input
                    type="number"
                    min={1}
                    max={maxMintable || MAX_PER_WALLET}
                    value={quantity}
                    onChange={(e) => {
                      const v = parseInt(e.target.value);
                      if (!isNaN(v)) {
                        setQuantity(
                          Math.min(maxMintable || MAX_PER_WALLET, Math.max(1, v))
                        );
                      }
                    }}
                    className="w-full text-center text-3xl font-black bg-transparent text-white outline-none"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    {walletMinted > 0 && `${walletMinted} already minted`}
                  </div>
                </div>

                <button
                  onClick={() =>
                    setQuantity(
                      Math.min(maxMintable || MAX_PER_WALLET, quantity + 1)
                    )
                  }
                  className="w-12 h-12 rounded-xl border border-wiki-border bg-wiki-card hover:border-wiki-yellow/40 hover:text-wiki-yellow transition-all flex items-center justify-center"
                  disabled={quantity >= (maxMintable || MAX_PER_WALLET)}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-wiki-dark border border-wiki-border rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Price per slot</span>
                <span className="text-white">{MINT_PRICE} ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Quantity</span>
                <span className="text-white">× {quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">$WIKI you receive</span>
                <span className="text-wiki-green">
                  {(quantity * 1_000_000).toLocaleString()} WIKI
                </span>
              </div>
              <div className="border-t border-wiki-border pt-2 flex justify-between">
                <span className="font-semibold text-white">Total</span>
                <span className="font-black text-wiki-yellow text-lg">
                  {totalCost} ETH
                </span>
              </div>
            </div>

            {/* CTA */}
            {!isConnected ? (
              <div className="flex justify-center">
                <ConnectButton label="Connect to Mint" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-3 p-4 bg-wiki-green/10 border border-wiki-green/20 rounded-xl text-wiki-green"
                  >
                    <CheckCircle2 size={20} />
                    <span className="font-bold">
                      Minted! Check your wallet.
                    </span>
                  </motion.div>
                ) : (
                  <motion.button
                    key="mint"
                    onClick={handleMint}
                    disabled={!mintActive || isPending || isConfirming || maxMintable === 0}
                    className="w-full py-4 rounded-xl font-black text-lg bg-gradient-to-r from-wiki-yellow to-wiki-orange text-black hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all glow-yellow flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isPending || isConfirming ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        {isPending ? "Confirm in wallet..." : "Confirming..."}
                      </>
                    ) : !mintActive ? (
                      "Mint Not Active Yet"
                    ) : maxMintable === 0 ? (
                      "Wallet Limit Reached"
                    ) : (
                      <>
                        <Zap size={20} />
                        Mint {quantity} Slot{quantity > 1 ? "s" : ""}
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            )}

            {writeError && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-start gap-2 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg p-3"
              >
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>{writeError.message.split(".")[0]}</span>
              </motion.div>
            )}

            {txHash && !isSuccess && (
              <p className="text-center text-xs text-gray-600 mt-3">
                Tx:{" "}
                <a
                  href={`https://basescan.org/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiki-yellow hover:underline font-mono"
                >
                  {txHash.slice(0, 10)}...{txHash.slice(-6)}
                </a>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
