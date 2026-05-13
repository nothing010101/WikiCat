// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title MintContract v3 — Wikicat Slot Reservation with 2-Day Window
/// @notice 5,000 slots @ 0.0011 ETH. 2-day window from activation.
/// @notice ETH collected here. NFT + token distribution done via authorized airdrop after deadline.
/// @notice After deadline: owner chooses withdraw (add LP + airdrop) OR issueRefunds — mutually exclusive.
contract MintContract is Ownable, ReentrancyGuard {
    uint256 public constant MINT_PRICE     = 0.0011 ether;
    uint256 public constant MAX_SLOTS      = 5_000;
    uint256 public constant MAX_PER_WALLET = 30;
    uint256 public constant MINT_DURATION  = 2 days;

    uint256 public totalSlotsMinted;
    mapping(address => uint256) public slotsMintedByWallet;

    // Unique minter list — used for batch refunds and airdrop reference
    address[] private _minterList;
    mapping(address => bool) private _isMinter;

    address public treasury;
    bool    public mintActive;
    uint256 public mintDeadline; // set once on first setMintActive(true)

    // Post-deadline — mutually exclusive
    bool    public fundsWithdrawn;
    bool    public refundsIssued;
    uint256 public refundProgress;

    event SlotReserved(address indexed user, uint256 quantity, uint256 totalPaid);
    event MintStatusChanged(bool active, uint256 deadline);
    event TreasuryUpdated(address newTreasury);
    event Withdrawn(address treasury, uint256 amount);
    event RefundIssued(address indexed recipient, uint256 amount);
    event RefundsComplete(uint256 totalRecipients);

    constructor(address _treasury, address initialOwner) Ownable(initialOwner) {
        require(_treasury != address(0), "Zero address");
        treasury = _treasury;
    }

    // ─── Reserve ──────────────────────────────────────────────────────────

    /// @notice Reserve quantity slots. ETH held here; NFT+tokens airdropped after deadline.
    function mint(uint256 quantity) external payable nonReentrant {
        require(mintActive, "Mint is not active");
        require(mintDeadline > 0 && block.timestamp < mintDeadline, "Mint window closed");
        require(quantity > 0 && quantity <= MAX_PER_WALLET, "Invalid quantity");
        require(totalSlotsMinted + quantity <= MAX_SLOTS, "Exceeds max slots");
        require(slotsMintedByWallet[msg.sender] + quantity <= MAX_PER_WALLET, "Exceeds wallet limit");
        require(msg.value == MINT_PRICE * quantity, "Incorrect ETH");

        slotsMintedByWallet[msg.sender] += quantity;
        totalSlotsMinted += quantity;

        if (!_isMinter[msg.sender]) {
            _isMinter[msg.sender] = true;
            _minterList.push(msg.sender);
        }

        emit SlotReserved(msg.sender, quantity, msg.value);
    }

    // ─── Admin ────────────────────────────────────────────────────────────

    /// @notice Activate mint window. Deadline set once on first activation.
    function setMintActive(bool _active) external onlyOwner {
        mintActive = _active;
        if (_active && mintDeadline == 0) {
            mintDeadline = block.timestamp + MINT_DURATION;
        }
        emit MintStatusChanged(_active, mintDeadline);
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Zero address");
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }

    /// @notice After deadline: withdraw all ETH to treasury for LP. Locks out refunds.
    function withdraw() external onlyOwner nonReentrant {
        require(mintDeadline > 0 && block.timestamp >= mintDeadline, "Deadline not reached");
        require(!fundsWithdrawn, "Already withdrawn");
        require(!refundsIssued,  "Refunds already issued");
        uint256 balance = address(this).balance;
        require(balance > 0, "Nothing to withdraw");
        fundsWithdrawn = true;
        (bool ok, ) = payable(treasury).call{value: balance}("");
        require(ok, "Transfer failed");
        emit Withdrawn(treasury, balance);
    }

    /// @notice After deadline: refund ETH to all minters in batches. Locks out withdraw.
    /// @param batchSize Minters per call (0 = all at once).
    function issueRefunds(uint256 batchSize) external onlyOwner nonReentrant {
        require(mintDeadline > 0 && block.timestamp >= mintDeadline, "Deadline not reached");
        require(!fundsWithdrawn, "Funds already withdrawn");
        require(!refundsIssued,  "Refunds already complete");
        require(refundProgress < _minterList.length, "No minters to refund");

        uint256 end = batchSize == 0
            ? _minterList.length
            : _min(refundProgress + batchSize, _minterList.length);

        for (uint256 i = refundProgress; i < end; i++) {
            address minter = _minterList[i];
            uint256 slots  = slotsMintedByWallet[minter];
            if (slots > 0) {
                uint256 amount = slots * MINT_PRICE;
                (bool ok, ) = payable(minter).call{value: amount}("");
                if (ok) emit RefundIssued(minter, amount);
            }
        }

        refundProgress = end;
        if (refundProgress >= _minterList.length) {
            refundsIssued = true;
            emit RefundsComplete(_minterList.length);
        }
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

    function minterCount() external view returns (uint256) {
        return _minterList.length;
    }

    /// @notice Returns paginated minter list for airdrop reference.
    function getMinters(uint256 offset, uint256 limit) external view returns (address[] memory list, uint256 total) {
        total = _minterList.length;
        uint256 end = _min(offset + limit, total);
        list = new address[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            list[i - offset] = _minterList[i];
        }
    }

    /// @notice Full mint state for frontend.
    function mintInfo() external view returns (
        uint256 price,
        uint256 maxSlots,
        uint256 minted,
        uint256 remaining,
        uint256 maxPerWallet,
        bool    active,
        uint256 deadline
    ) {
        bool windowOpen = mintActive && mintDeadline > 0 && block.timestamp < mintDeadline;
        return (MINT_PRICE, MAX_SLOTS, totalSlotsMinted, MAX_SLOTS - totalSlotsMinted, MAX_PER_WALLET, windowOpen, mintDeadline);
    }

    function _min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
}
