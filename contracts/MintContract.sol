// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IWikiToken {
    function mint(address to, uint256 amount) external;
}

interface IFounderNFT {
    function mint(address to) external returns (uint256);
    function totalMinted() external view returns (uint256);
}

/// @title MintContract — Wikicat Slot Minting
/// @notice 5,000 slots @ 0.0011 ETH each. Each slot = 1 NFT + 1,000,000 WIKI.
/// @notice Max 30 slots per wallet.
contract MintContract is Ownable, ReentrancyGuard {
    IWikiToken public immutable wikiToken;
    IFounderNFT public immutable founderNFT;

    uint256 public constant MINT_PRICE = 0.0011 ether;
    uint256 public constant MAX_SLOTS = 5_000;
    uint256 public constant MAX_PER_WALLET = 30;
    uint256 public constant TOKENS_PER_SLOT = 1_000_000 * 10 ** 18;

    uint256 public totalSlotsMinted;
    mapping(address => uint256) public slotsMintedByWallet;

    address public treasury;
    bool public mintActive;

    event Minted(
        address indexed user,
        uint256 quantity,
        uint256 totalPaid,
        uint256 firstTokenId
    );
    event MintStatusChanged(bool active);
    event TreasuryUpdated(address newTreasury);
    event Withdrawn(address treasury, uint256 amount);

    constructor(
        address _wikiToken,
        address _founderNFT,
        address _treasury,
        address initialOwner
    ) Ownable(initialOwner) {
        require(_wikiToken != address(0), "Zero address: token");
        require(_founderNFT != address(0), "Zero address: nft");
        require(_treasury != address(0), "Zero address: treasury");
        wikiToken = IWikiToken(_wikiToken);
        founderNFT = IFounderNFT(_founderNFT);
        treasury = _treasury;
        mintActive = false;
    }

    /// @notice Mint `quantity` slots. Sends ETH to treasury on withdraw.
    function mint(uint256 quantity) external payable nonReentrant {
        require(mintActive, "Mint is not active");
        require(quantity > 0, "Quantity must be > 0");
        require(quantity <= MAX_PER_WALLET, "Exceeds max per tx");
        require(
            totalSlotsMinted + quantity <= MAX_SLOTS,
            "Exceeds max slots"
        );
        require(
            slotsMintedByWallet[msg.sender] + quantity <= MAX_PER_WALLET,
            "Exceeds wallet limit"
        );
        require(msg.value == MINT_PRICE * quantity, "Incorrect ETH amount");

        slotsMintedByWallet[msg.sender] += quantity;
        totalSlotsMinted += quantity;

        uint256 firstTokenId = founderNFT.totalMinted() + 1;
        for (uint256 i = 0; i < quantity; i++) {
            founderNFT.mint(msg.sender);
        }
        wikiToken.mint(msg.sender, TOKENS_PER_SLOT * quantity);

        emit Minted(msg.sender, quantity, msg.value, firstTokenId);
    }

    // ─── Admin ────────────────────────────────────────────────────────────

    function setMintActive(bool _active) external onlyOwner {
        mintActive = _active;
        emit MintStatusChanged(_active);
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Zero address");
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }

    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "Nothing to withdraw");
        (bool ok, ) = payable(treasury).call{value: balance}("");
        require(ok, "Transfer failed");
        emit Withdrawn(treasury, balance);
    }

    // ─── Views ────────────────────────────────────────────────────────────

    function remainingSlots() external view returns (uint256) {
        return MAX_SLOTS - totalSlotsMinted;
    }

    function walletSlots(address wallet) external view returns (uint256) {
        return slotsMintedByWallet[wallet];
    }

    function walletRemaining(address wallet) external view returns (uint256) {
        uint256 minted = slotsMintedByWallet[wallet];
        return minted >= MAX_PER_WALLET ? 0 : MAX_PER_WALLET - minted;
    }

    function totalEthCollected() external view returns (uint256) {
        return address(this).balance;
    }

    function mintInfo()
        external
        view
        returns (
            uint256 price,
            uint256 maxSlots,
            uint256 minted,
            uint256 remaining,
            uint256 maxPerWallet,
            bool active
        )
    {
        return (
            MINT_PRICE,
            MAX_SLOTS,
            totalSlotsMinted,
            MAX_SLOTS - totalSlotsMinted,
            MAX_PER_WALLET,
            mintActive
        );
    }
}
