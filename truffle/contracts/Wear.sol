// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Wear is ERC1155, AccessControl {
    uint256 public lastTokenId = 0; // the token id of the last nft

    constructor() ERC1155("http://localhost:8081/nft/{id}.json") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
 
    function mintWear(address to) public returns (uint256) {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not a minter");
        require(to != address(0), "The _to address is invalid");

        _mint(to, lastTokenId, 1, "");
        lastTokenId += 1;

        return lastTokenId;
    }

    function uri(uint256 _tokenid) override public pure returns (string memory) {
        return string(
            abi.encodePacked(
                "http://localhost:8081/nft/",
                Strings.toString(_tokenid),".json"
            )
        );
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}