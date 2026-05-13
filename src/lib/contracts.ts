export const WIKI_TOKEN_ABI = [
  { inputs: [{ name: "initialOwner", type: "address" }], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [{ name: "account", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalSupply", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "remainingSupply", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "name", outputs: [{ name: "", type: "string" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], stateMutability: "view", type: "function" },
] as const;

export const FOUNDER_NFT_ABI = [
  { inputs: [{ name: "owner", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalMinted", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "remaining", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
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
    inputs: [
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    name: "getMinters",
    outputs: [
      { name: "list", type: "address[]" },
      { name: "total", type: "uint256" },
    ],
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

// MintContract v3 — deployed & verified on Base Chain
// https://basescan.org/address/0x45D8750Ae28C0875056b715497d92395FF7C8AA2#code
// Mint active — deadline: 2026-05-15T08:30:19Z (15/5/2026 15:30 WIB)
export const CONTRACT_ADDRESSES = {
  wikiToken:    (process.env.NEXT_PUBLIC_WIKI_TOKEN_ADDRESS    || "0xb19FdC19DB6F3eE33C83CBaa01781B22C3231cef") as `0x${string}`,
  founderNFT:   (process.env.NEXT_PUBLIC_FOUNDER_NFT_ADDRESS   || "0x5Ff980e0D8B1ED57427cb1f44039649F7910327b") as `0x${string}`,
  mintContract: (process.env.NEXT_PUBLIC_MINT_CONTRACT_ADDRESS || "0x45D8750Ae28C0875056b715497d92395FF7C8AA2") as `0x${string}`,
};
