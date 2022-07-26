// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//0xfb75D12D79ba20e2f0172CF315Fe57F268E8a704
//here users will claim token "AD"
//when deploy the contract, input the result of the list "bufferToHex(tree.getRoot())" and the amount, remember multiply 18 decimals
contract AirDrop is ERC20("AirDrop", "AD") {
    bytes32 public immutable root;//use to loop for who is eligible for the airdrop from DB
    uint256 public immutable rewardAmount;//no. of tokens they can claim
    mapping(address => bool) claimed;

//the root of merkletree
    constructor(bytes32 _root, uint256 _rewardAmount) {
        root = _root;
        rewardAmount = _rewardAmount;
    }
//the merkleproof which created by merkletree.js should be passed to the claim function
    function claim(bytes32[] calldata _proof) external {
        require(!claimed[msg.sender], "Already claimed air drop");//check if they already claimed
        claimed[msg.sender] = true;
        bytes32 _leaf = keccak256(abi.encodePacked(msg.sender));//address which call the "claim"
        require(
            MerkleProof.verify(_proof, root, _leaf),
            "Incorrect merkle proof"
        );
        _mint(msg.sender, rewardAmount);//if eligible, mint tokens for them 
    }
}
//when "claim", input the _proof of the selected address