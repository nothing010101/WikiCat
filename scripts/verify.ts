import { run } from "hardhat";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

async function main() {
  const addressFile = path.join(__dirname, "../deployed-addresses.json");
  if (!fs.existsSync(addressFile)) {
    throw new Error(
      "deployed-addresses.json not found. Run deploy script first."
    );
  }

  const addrs = JSON.parse(fs.readFileSync(addressFile, "utf-8"));
  console.log("Verifying contracts on Basescan...\n");

  console.log("1/3 Verifying WikiToken...");
  await run("verify:verify", {
    address: addrs.wikiToken,
    constructorArguments: [addrs.deployer],
  });

  console.log("2/3 Verifying FounderNFT...");
  await run("verify:verify", {
    address: addrs.founderNFT,
    constructorArguments: [addrs.deployer],
  });

  console.log("3/3 Verifying MintContract...");
  await run("verify:verify", {
    address: addrs.mintContract,
    constructorArguments: [
      addrs.wikiToken,
      addrs.founderNFT,
      addrs.treasury,
      addrs.deployer,
    ],
  });

  console.log("\n✅ All contracts verified on Basescan!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
