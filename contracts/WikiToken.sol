// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title WikiToken ($WIKI) — Wikicat ERC20 Token on Base
/// @notice Total supply: 10,000,000,000 WIKI
contract WikiToken is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 10_000_000_000 * 10 ** 18;

    address public mintContract;
    bool public mintContractSet;

    event MintContractSet(address indexed mintContract);

    constructor(address initialOwner) ERC20("Wikicat", "WIKI") Ownable(initialOwner) {}

    /// @notice Set the MintContract address (one-time, immutable after set)
    function setMintContract(address _mintContract) external onlyOwner {
        require(!mintContractSet, "Mint contract already set");
        require(_mintContract != address(0), "Zero address");
        mintContract = _mintContract;
        mintContractSet = true;
        emit MintContractSet(_mintContract);
    }

    /// @notice Mint founder / team / treasury allocations (owner only)
    function mintAllocation(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= TOTAL_SUPPLY, "Exceeds total supply");
        _mint(to, amount);
    }

    /// @notice Called by MintContract to mint user tokens on slot purchase
    function mint(address to, uint256 amount) external {
        require(
            msg.sender == mintContract || msg.sender == owner(),
            "Not authorized"
        );
        require(totalSupply() + amount <= TOTAL_SUPPLY, "Exceeds total supply");
        _mint(to, amount);
    }

    /// @notice Remaining mintable supply
    function remainingSupply() external view returns (uint256) {
        return TOTAL_SUPPLY - totalSupply();
    }
}
