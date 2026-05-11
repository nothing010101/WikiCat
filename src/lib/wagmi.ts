import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Wikicat ($WIKI)",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "18b4abeb470c796e1c8a1dc8bff56195",
  chains: [base],
  ssr: true,
});

export { base };
