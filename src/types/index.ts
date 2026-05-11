export interface MintStatus {
  totalSlotsMinted: number;
  remainingSlots: number;
  mintActive: boolean;
  mintPrice: string;
  maxSlots: number;
  maxPerWallet: number;
  totalEthCollected: string;
}

export interface UserMintedStatus {
  address: string;
  slotsMinted: number;
  slotsRemaining: number;
  wikiBalance: string;
  nftBalance: number;
}

export interface TokenomicsSlice {
  label: string;
  percentage: number;
  amount: string;
  color: string;
  description: string;
}

export const TOKENOMICS: TokenomicsSlice[] = [
  {
    label: "Founder Mint",
    percentage: 50,
    amount: "5,000,000,000",
    color: "#FFD700",
    description: "Allocated to founders for project development and vision",
  },
  {
    label: "LP Pool",
    percentage: 49,
    amount: "4,900,000,000",
    color: "#00FF87",
    description: "Liquidity pool on Base DEXes for healthy trading",
  },
  {
    label: "Treasury",
    percentage: 0.8,
    amount: "80,000,000",
    color: "#7C3AED",
    description: "Community treasury for grants, partnerships, and growth",
  },
  {
    label: "Team",
    percentage: 0.2,
    amount: "20,000,000",
    color: "#FF6B00",
    description: "Core team allocation, vested over 12 months",
  },
];

export const MINT_CONFIG = {
  totalSlots: 5_000,
  tokensPerSlot: 1_000_000,
  mintPrice: 0.0011,
  maxPerWallet: 30,
  totalSupply: 10_000_000_000,
} as const;
