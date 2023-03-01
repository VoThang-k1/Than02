// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    event Airdrop(address indexed sender, uint256 amount, uint256 totalAmount);

    mapping(address => bool) public whitelist;
    mapping(address => bool) public admins;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Load name and symbol from .env file
    }

    function airdrop(address[] memory reciece, uint256 amount) public onlyOwner {
        uint256 totalAmount = amount * reciece.length;
        require(totalAmount <= balanceOf(msg.sender), "Insufficient balance for airdrop");

        for (uint256 i = 0; i < reciece.length; i++) {
            address reciece = reciece[i];
            require(whitelist[reciece], "Reciece is not whitelisted");
            _mint(reciece, amount);
        }

        emit Airdrop(msg.sender, amount, totalAmount);
    }

    function addWhitelisted(address account) public onlyAdmin {
        whitelist[account] = true;
    }

    function removeWhitelisted(address account) public onlyAdmin {
        whitelist[account] = false;
    }

    function addAdmin(address account) public onlyOwner {
        admins[account] = true;
    }

    function removeAdmin(address account) public onlyOwner {
        admins[account] = false;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admins can perform this action");
        _;
    }
}
