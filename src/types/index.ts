export interface TokenomicsSlice {
  label: string;
  percentage: number;
  amount: string;
  color: string;
  description: string;
}

export const TOKENOMICS: TokenomicsSlice[] = [
  {
    label: "LP via bankr.bot",
    percentage: 100,
    amount: "100,000,000,000",
    color: "#FFD700",
    description: "100% launched on LP via bankr.bot",
  },
];

export const MINT_CONFIG = {
  totalSupply: 100_000_000_000,
} as const;
