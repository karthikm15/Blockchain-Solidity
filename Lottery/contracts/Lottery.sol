pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    address lastWinner;
    
    function Lottery() public {
        manager = msg.sender; // Manager variable is sender's address (whoever creates the contract)
    }
    
    function enter() public payable { // Need to add payable because will be sending ether in transaction (to put in prize pool) when entering name
        require(msg.value > .01 ether); // If condition inside require(), will exit out of function and no changes to the contract will be made after
        // If just wrote .01, then would be counted as wei - to make it .01 ether, type in ".01 ether"
        
        
        players.push(msg.sender); // If enter with more than .01 ether, than join the array of players
    }
    
    /*Random number generator:
        1. Take current block difficulty, current time, addresses of players
        2. Run it through SHA3 algorithm
        3. Return a really big number
     - Different hashing algorithms: sha3() [deprecated version] , keccak256() - all global functions so can be called w/o import
    */
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players)); // now = current time
    }
    
    function pickWinner() public restricted { // Makes sure only the manager can call this function
        
        uint index = random() % players.length; // Because using %, will return number from 0 to players.length-1
        players[index].transfer(this.balance); // Transfer money balance of contract to the address of player
        lastWinner = players[index];
        players = new address[](0); // Resets the player dynamic array of an initial size 0
    }

    modifier restricted() { // If add this to other function, _ represents other code in function - so basically can run require() and then run rest of code
        require(msg.sender == manager); // Makes sure only the manager can call this function
        _;
    }
    
    function getPlayers() public view returns (address[]) {
        return players; // Return players - remember can only return one player (through indexing) in Remix compiler
    }

    function getBalance() public view returns (uint) {
        return this.balance;
    }

    function getLastWinner() public view returns (address) {
        return lastWinner;
    }
}