/* Importing libraries */
const assert = require('assert'); // Used for making assertions about tests
const ganache = require('ganache-cli'); // Local test network for deploying contracts - accounts being created are open (can access without public and private key)
const Web3 = require('web3'); // When use Web3, always going to be requiring in or importing a constructor function

/* Getting ABI and bytecode from compile.js file */
const {interface, bytecode} = require('../compile');

/* Instance of Web3 going to work with. Need to specify provider (otherwise the instance of
    web3 will not work).
    - Every function we return with web3 is asychronous and will return a promise - need to take promise
        - Can use await function to do this - need to make sure when using await, all of the functions that
          you are calling are asynchronous in nature
        - If synchronous, then use .then(VARIABLE_NAME => {functions involving variable})
            - remove the async before ()
            - remove the await and variable declaration
            - remove the "let" command
*/
const provider = ganache.provider();
const web3 = new Web3(provider);

// Initializing variables
let accounts;
let inbox;
const INITIAL_STRING = "Hi there!"

// beforeEach function
beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments : [INITIAL_STRING]})
        .send({from: accounts[0], gas: '1000000'});
    /* Code Breakdown:
        - new web3.eth.Contract(JSON.parse(interface)) - teaches web3 about what methods an Inbox contract has
            - JSON.parse(interface) - spits out JSON representation of ABI to get back a Javascript object
        - .deploy({data: bytecode, arguments : ['Hi there!']}) - tells web3 that we want to eploy a new copy of this contract
        - .send({from: accounts[0], gas: '1000000'}); - instructs web3 to send out a transaction that creates this contract 
    Variable Breakdown (what is inside inbox variable):
        - of type Contract object
        - gives information about the provider (three types of providers: web socket, HTTP, IPC [interprocess communication])
        - methods (functions that are tied to the contract) - can call on these function
        - options (contains some information about the transaction) */
    
    inbox.setProvider(provider);
})

// describe function
describe('Inbox', () => {
    it ('deploys a contract', () => {
        // assert.ok - checks whether there is a value assigned to that variable
        assert.ok(inbox.options.address); // inbox.options (gives the transaction details) .address (accessing the address in the transaction details)
    });

    it('has a default message', async () => {
        /* Get the message from the inbox instance - have called message (a public variable in the contract)
            - In the .message() paranthesis, put any parameters that the function requires
            - The second set of paranthesis, what details are in the transaction/call */
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING)
    });

    it('can change the message', async () =>{
        /* This method will set the message to 'bye' and send it from the 1st account of the test accounts Ganache created
            - Function will return a transaction hash but essentially useless
            - Have to add .send() function - otherwise message won't send
            - Asynchronous - since sending transaction to a function */
        await inbox.methods.setMessage('bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});