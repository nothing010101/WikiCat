export const WIKI_TOKEN_ABI = [
  { inputs: [{ name: "initialOwner", type: "address" }], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [{ name: "account", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalSupply", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "name", outputs: [{ name: "", type: "string" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], stateMutability: "view", type: "function" },
] as const;

export const FOUNDER_NFT_ABI = [
  { inputs: [{ name: "owner", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalMinted", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
] as const;

export const MINT_CONTRACT_ABI = [
  { inputs: [{ name: "quantity", type: "uint256" }], name: "mint", outputs: [], stateMutability: "payable", type: "function" },
  {
    inputs: [], name: "mintInfo",
    outputs: [
      { name: "price", type: "uint256" },
      { name: "maxSlots", type: "uint256" },
      { name: "minted", type: "uint256" },
      { name: "remaining", type: "uint256" },
      { name: "maxPerWallet", type: "uint256" },
      { name: "active", type: "bool" },
      { name: "deadline", type: "uint256" },
    ],
    stateMutability: "view", type: "function",
  },
  { inputs: [], name: "mintDeadline", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalSlotsMinted", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "remainingSlots", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "wallet", type: "address" }], name: "walletSlots", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "wallet", type: "address" }], name: "walletRemaining", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalEthCollected", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "minterCount", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "mintActive", outputs: [{ name: "", type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "fundsWithdrawn", outputs: [{ name: "", type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "refundsIssued", outputs: [{ name: "", type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "refundProgress", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "MINT_PRICE", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "MAX_SLOTS", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "MAX_PER_WALLET", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "_active", type: "bool" }], name: "setMintActive", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "withdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "batchSize", type: "uint256" }], name: "issueRefunds", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ name: "offset", type: "uint256" }, { name: "limit", type: "uint256" }],
    name: "getMinters",
    outputs: [{ name: "list", type: "address[]" }, { name: "total", type: "uint256" }],
    stateMutability: "view", type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "quantity", type: "uint256" },
      { indexed: false, name: "totalPaid", type: "uint256" },
    ],
    name: "SlotReserved", type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "recipient", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
    name: "RefundIssued", type: "event",
  },
] as const;

// Deployed & verified on Base Mainnet — May 2026
// WikiToken:    https://basescan.org/address/0xCe44930086bf38a5dcB02A6b23C7BAE4C269Cb07
// FounderNFT:   https://basescan.org/address/0x404DE9409B77341434e95B4e502407742Edb3D59
// MintContract: https://basescan.org/address/0xa65Bd77d0d78CB253EAd26b61Ae183c5AD09b924
export const CONTRACT_ADDRESSES = {
  wikiToken:    (process.env.NEXT_PUBLIC_WIKI_TOKEN_ADDRESS    || "0xCe44930086bf38a5dcB02A6b23C7BAE4C269Cb07") as `0x${string}`,
  founderNFT:   (process.env.NEXT_PUBLIC_FOUNDER_NFT_ADDRESS   || "0x404DE9409B77341434e95B4e502407742Edb3D59") as `0x${string}`,
  mintContract: (process.env.NEXT_PUBLIC_MINT_CONTRACT_ADDRESS || "0xa65Bd77d0d78CB253EAd26b61Ae183c5AD09b924") as `0x${string}`,
};
