# Wikicat ($WIKI) — Base Chain

> The internet's cat has its own token. 10B supply. 5,000 Founder slots. Built on Base.

## Quick Links

| Item | Detail |
|------|--------|
| Network | Base Mainnet (Chain ID: 8453) |
| Mint Price | 0.0011 ETH / slot |
| Total Slots | 5,000 |
| Max per Wallet | 30 slots |
| Per Slot | 1 NFT + 1,000,000 $WIKI |
| Total Supply | 10,000,000,000 $WIKI |

---

## Project Structure

```
wikicat/
├── contracts/
│   ├── WikiToken.sol        # ERC20 — $WIKI token
│   ├── FounderNFT.sol       # ERC721 — Founder Pass NFT
│   └── MintContract.sol     # Mint logic (price, cap, per-wallet limit)
├── scripts/
│   ├── deploy.ts            # Deploy all 3 contracts + wire them up
│   └── verify.ts            # Verify on Basescan
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout + Web3Provider
│   │   ├── page.tsx         # Main landing page
│   │   └── api/
│   │       ├── mint/        # Backend relayer endpoint
│   │       ├── status/      # Live mint status
│   │       └── user-minted/ # Per-wallet stats
│   ├── components/          # UI components
│   ├── lib/
│   │   ├── contracts.ts     # ABIs + contract addresses
│   │   └── wagmi.ts         # Wagmi + RainbowKit config
│   └── providers/
│       └── Web3Provider.tsx # Wagmi + RainbowKit + QueryClient
├── hardhat.config.ts
├── .env.example
└── README.md
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<get from cloud.walletconnect.com>
PRIVATE_KEY=<your deployer wallet private key>
TREASURY_ADDRESS=<treasury wallet>
FOUNDER_ADDRESS=<founder wallet>
BASESCAN_API_KEY=<get from basescan.org>
```

> **Security**: Never commit `.env` to git. The `.gitignore` already excludes it.

---

## Deploy Smart Contracts to Base

### Step 1: Compile

```bash
npm run compile
```

### Step 2: Deploy to Base Sepolia (testnet first)

```bash
npm run deploy:baseSepolia
```

Check the output — it will print all 3 contract addresses and the env vars to add.

### Step 3: Deploy to Base Mainnet

```bash
npm run deploy:base
```

After deploy, copy the printed env vars into your `.env` file:

```env
NEXT_PUBLIC_WIKI_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_FOUNDER_NFT_ADDRESS=0x...
NEXT_PUBLIC_MINT_CONTRACT_ADDRESS=0x...
```

### Step 4: Verify on Basescan

```bash
npm run verify:base
```

### Step 5: Activate Mint

Call `setMintActive(true)` on the `MintContract` through Basescan's write interface or via a script:

```bash
npx hardhat console --network base
# then:
const contract = await ethers.getContractAt("MintContract", "<MINT_CONTRACT_ADDRESS>")
await contract.setMintActive(true)
```

---

## Run Frontend Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

### Option A: CLI

```bash
npx vercel --prod
```

Then add your environment variables in Vercel dashboard:
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_WIKI_TOKEN_ADDRESS`
- `NEXT_PUBLIC_FOUNDER_NFT_ADDRESS`
- `NEXT_PUBLIC_MINT_CONTRACT_ADDRESS`
- `PRIVATE_KEY` (for the relayer API)
- `TREASURY_ADDRESS`

### Option B: GitHub Integration

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Connect your GitHub repo
4. Add environment variables in Vercel settings
5. Deploy

---

## Tokenomics

| Allocation | % | Amount |
|-----------|---|--------|
| Founder Mint | 50% | 5,000,000,000 |
| LP Pool | 49% | 4,900,000,000 |
| Treasury | 0.8% | 80,000,000 |
| Team | 0.2% | 20,000,000 |

The LP allocation (4.9B) is minted by the owner when adding liquidity to a DEX.

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/status` | GET | Live mint stats (slots, ETH, progress) |
| `/api/user-minted?address=0x...` | GET | Per-wallet stats |
| `/api/mint` | POST | Backend relayer (requires `PRIVATE_KEY`) |

### Example

```bash
# Get mint status
curl https://your-domain.vercel.app/api/status

# Get wallet stats
curl "https://your-domain.vercel.app/api/user-minted?address=0xYourWallet"
```

---

## Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Web3**: Wagmi v2, viem, RainbowKit, WalletConnect
- **Contracts**: Solidity 0.8.24, OpenZeppelin v5, Hardhat
- **Chain**: Base Mainnet (Coinbase L2 on Ethereum)
- **Deploy**: Vercel

---

## License

MIT
