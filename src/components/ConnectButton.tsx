"use client";

import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from "wagmi";
import { useState, useEffect, useRef } from "react";
import { Wallet, ChevronDown, LogOut, Copy, Check, ExternalLink, AlertTriangle } from "lucide-react";
import { base } from "@/lib/wagmi";

interface ConnectButtonProps {
  label?: string;
  chainStatus?: string;
  showBalance?: boolean;
  accountStatus?: string;
}

export function ConnectButton({ label = "Connect Wallet" }: ConnectButtonProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { data: balance } = useBalance({ address, chainId: base.id });
  const [showMenu, setShowMenu] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isWrongChain = isConnected && chainId !== base.id;

  // Auto-switch to Base when connected on wrong chain
  useEffect(() => {
    if (isConnected && chainId !== base.id && !isSwitching) {
      switchChain({ chainId: base.id });
    }
  }, [isConnected, chainId, isSwitching, switchChain]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
        setShowWallets(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const shortAddr = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Wrong chain — show manual switch button as fallback
  if (isWrongChain) {
    return (
      <button
        onClick={() => switchChain({ chainId: base.id })}
        disabled={isSwitching}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-wiki-orange/20 border border-wiki-orange/40 text-wiki-orange font-bold text-sm hover:bg-wiki-orange/30 transition-all disabled:opacity-50"
      >
        <AlertTriangle size={14} />
        {isSwitching ? "Switching to Base..." : "Switch to Base"}
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-wiki-border bg-wiki-card hover:border-wiki-yellow/40 transition-all text-sm"
        >
          <div className="w-2 h-2 bg-wiki-green rounded-full animate-pulse" />
          <span className="text-white font-mono text-xs">{shortAddr}</span>
          <ChevronDown size={13} className="text-gray-400" />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-wiki-card border border-wiki-border rounded-xl p-2 shadow-2xl z-50">
            {balance && (
              <div className="px-3 py-2 mb-1 border-b border-wiki-border">
                <p className="text-xs text-gray-500">Balance (Base)</p>
                <p className="text-sm text-white font-bold">
                  {parseFloat(balance.formatted).toFixed(4)} ETH
                </p>
              </div>
            )}
            <button
              onClick={copyAddress}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-wiki-dark text-sm text-gray-300 transition-colors"
            >
              {copied ? (
                <Check size={13} className="text-wiki-green" />
              ) : (
                <Copy size={13} />
              )}
              {copied ? "Copied!" : "Copy address"}
            </button>
            <a
              href={`https://basescan.org/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-wiki-dark text-sm text-gray-300 transition-colors"
            >
              <ExternalLink size={13} />
              View on Basescan
            </a>
            <button
              onClick={() => {
                disconnect();
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-sm text-red-400 transition-colors mt-1"
            >
              <LogOut size={13} />
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowWallets(!showWallets)}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-wiki-yellow text-black font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50"
      >
        <Wallet size={15} />
        {isPending ? "Connecting..." : label}
      </button>

      {showWallets && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-wiki-card border border-wiki-border rounded-xl p-2 shadow-2xl z-50">
          <p className="text-xs text-gray-500 uppercase tracking-wider px-3 py-1 mb-1">
            Choose wallet
          </p>
          {connectors.length === 0 && (
            <p className="text-xs text-gray-500 px-3 py-2">
              No wallet detected. Install MetaMask or Coinbase Wallet.
            </p>
          )}
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => {
                // Pass chainId: base.id so wagmi forces Base Chain on connect
                connect({ connector, chainId: base.id });
                setShowWallets(false);
              }}
              disabled={isPending}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-wiki-dark text-sm text-gray-200 transition-colors disabled:opacity-50"
            >
              <div className="w-6 h-6 rounded-md bg-wiki-yellow/10 flex items-center justify-center">
                <Wallet size={13} className="text-wiki-yellow" />
              </div>
              {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
