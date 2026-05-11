// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title FounderNFT — Wikicat Founder Pass (ERC721)
/// @notice Max 5,000 NFTs. One per slot. Non-transferable badge of early support.
contract FounderNFT is ERC721, Ownable {
    uint256 public constant MAX_SUPPLY = 5_000;
    uint256 private _nextTokenId = 1;

    address public mintContract;
    bool public mintContractSet;

    string private _baseTokenURI;

    event MintContractSet(address indexed mintContract);
    event BaseURISet(string baseURI);

    constructor(address initialOwner)
        ERC721("Wikicat Founder", "WIKIFNDR")
        Ownable(initialOwner)
    {}

    /// @notice Set MintContract address (one-time)
    function setMintContract(address _mintContract) external onlyOwner {
        require(!mintContractSet, "Mint contract already set");
        require(_mintContract != address(0), "Zero address");
        mintContract = _mintContract;
        mintContractSet = true;
        emit MintContractSet(_mintContract);
    }

    /// @notice Update base URI for metadata
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
        emit BaseURISet(baseURI);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    /// @notice Mint a single NFT to address (MintContract or owner only)
    function mint(address to) external returns (uint256) {
        require(
            msg.sender == mintContract || msg.sender == owner(),
            "Not authorized"
        );
        require(_nextTokenId <= MAX_SUPPLY, "Max supply reached");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }

    /// @notice Total NFTs minted so far
    function totalMinted() external view returns (uint256) {
        return _nextTokenId - 1;
    }

    /// @notice Remaining NFTs available
    function remaining() external view returns (uint256) {
        return MAX_SUPPLY - (_nextTokenId - 1);
    }
}
