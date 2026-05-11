import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("\n🚀 Deploying Wikicat contracts...");
  console.log("Deployer:", deployer.address);
  console.log(
    "Balance:",
    ethers.formatEther(await ethers.provider.getBalance(deployer.address)),
    "ETH\n"
  );

  const FOUNDER_ADDRESS = process.env.FOUNDER_ADDRESS || deployer.address;
  const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS || deployer.address;

  // ── 1. Deploy WikiToken ──────────────────────────────────────────────
  console.log("1/3 Deploying WikiToken...");
  const WikiToken = await ethers.getContractFactory("WikiToken");
  const wikiToken = await WikiToken.deploy(deployer.address);
  await wikiToken.waitForDeployment();
  const wikiTokenAddr = await wikiToken.getAddress();
  console.log("   WikiToken deployed:", wikiTokenAddr);

  // ── 2. Deploy FounderNFT ─────────────────────────────────────────────
  console.log("2/3 Deploying FounderNFT...");
  const FounderNFT = await ethers.getContractFactory("FounderNFT");
  const founderNFT = await FounderNFT.deploy(deployer.address);
  await founderNFT.waitForDeployment();
  const founderNFTAddr = await founderNFT.getAddress();
  console.log("   FounderNFT deployed:", founderNFTAddr);

  // ── 3. Deploy MintContract ───────────────────────────────────────────
  console.log("3/3 Deploying MintContract...");
  const MintContract = await ethers.getContractFactory("MintContract");
  const mintContract = await MintContract.deploy(
    wikiTokenAddr,
    founderNFTAddr,
    TREASURY_ADDRESS,
    deployer.address
  );
  await mintContract.waitForDeployment();
  const mintContractAddr = await mintContract.getAddress();
  console.log("   MintContract deployed:", mintContractAddr);

  // ── 4. Wire contracts ─────────────────────────────────────────────────
  console.log("\n🔧 Wiring contracts...");
  let tx = await wikiToken.setMintContract(mintContractAddr);
  await tx.wait();
  console.log("   WikiToken → MintContract set");

  tx = await founderNFT.setMintContract(mintContractAddr);
  await tx.wait();
  console.log("   FounderNFT → MintContract set");

  // ── 5. Mint founder allocations ───────────────────────────────────────
  console.log("\n💰 Minting founder allocations...");
  const FOUNDER_AMOUNT = ethers.parseEther("5000000000"); // 5B — 50%
  const TEAM_AMOUNT = ethers.parseEther("20000000"); // 20M — 0.2%
  const TREASURY_AMOUNT = ethers.parseEther("80000000"); // 80M — 0.8%
  // 4.9B (49%) for LP — left unminted, to be minted by owner when adding LP

  tx = await wikiToken.mintAllocation(FOUNDER_ADDRESS, FOUNDER_AMOUNT);
  await tx.wait();
  console.log("   Founder 5B WIKI →", FOUNDER_ADDRESS);

  tx = await wikiToken.mintAllocation(deployer.address, TEAM_AMOUNT);
  await tx.wait();
  console.log("   Team 20M WIKI →", deployer.address);

  tx = await wikiToken.mintAllocation(TREASURY_ADDRESS, TREASURY_AMOUNT);
  await tx.wait();
  console.log("   Treasury 80M WIKI →", TREASURY_ADDRESS);

  // ── 6. Save addresses ─────────────────────────────────────────────────
  const addresses = {
    wikiToken: wikiTokenAddr,
    founderNFT: founderNFTAddr,
    mintContract: mintContractAddr,
    deployer: deployer.address,
    founder: FOUNDER_ADDRESS,
    treasury: TREASURY_ADDRESS,
    deployedAt: new Date().toISOString(),
    network: (await ethers.provider.getNetwork()).name,
    chainId: Number((await ethers.provider.getNetwork()).chainId),
  };

  fs.writeFileSync(
    path.join(__dirname, "../deployed-addresses.json"),
    JSON.stringify(addresses, null, 2)
  );

  const envLine = `
NEXT_PUBLIC_WIKI_TOKEN_ADDRESS=${wikiTokenAddr}
NEXT_PUBLIC_FOUNDER_NFT_ADDRESS=${founderNFTAddr}
NEXT_PUBLIC_MINT_CONTRACT_ADDRESS=${mintContractAddr}
`;
  console.log("\n✅ Deployment complete!\n");
  console.log("Add these to your .env:\n", envLine);
  console.log("Full details saved to deployed-addresses.json");
  console.log("\n⚡ Next steps:");
  console.log(
    "  1. Copy addresses above into .env (or Vercel environment variables)"
  );
  console.log(
    "  2. Run: npm run verify:base  (to verify on Basescan)"
  );
  console.log(
    "  3. Call setMintActive(true) on MintContract when ready to open mint"
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
