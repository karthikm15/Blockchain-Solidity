/* Path will help build a path directory over to Inbox.sol. This will allow us to get cross-platform
compatability (betwen different operating systems). Importing libraries. */
const path = require('path');
const fs = require('fs');
const solc = require('solc');

/* inboxPath marks the path to the Inbox.sol code. source reads in the file. */
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8')

/* Actual compile statement. 1 represents number of smart contracts need to compile. module.exports
allows you to export the code and access it with a require statemetn.*/
module.exports = solc.compile(source, 1).contracts[':Lottery'];
/*
When run the contract: returns an object that contains a list of contracts
    - Soldity compiler allows you to deploy multiple contracts at once (deploying one here)
    1. Returns the "Inbox" object with a bunch of different metadata:
        - bytecode - actual code used to put inside Ethereum network
        - interface - ABI (communication layer) - just lists out functions in a contract
        - other properties (not important right now) */