const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());

let lottery;
let accounts;
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas:'1000000'});
});

describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple accounts to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('requires a minimum amount of ether to enter', async () => {
        try { // Will fail the assertion - so will the exception will be caught
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 200 // 200 wei
            }); 
            assert(false); // Will always fail the it-statement
        } catch (err) {
            assert(err);
        }
    });

    it('only manager can call pickWinner', async () =>{
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it ('sends money to the winner and resets the players array', async () => {
        await lottery.methods.enter().send({ // Sends 2 ether to the prize pool
            from: accounts[0], 
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]); // Gets the current account balance of accounts[0]

        await lottery.methods.pickWinner().send({from: accounts[0]}); // accounts[0] is the only person there - should get 2 ether back

        const finalBalance = await web3.eth.getBalance(accounts[0]); // Should get the 2 ether back
        // However, going to be less than 2 ether (finalBalance - initialBalance), because need to spend money on gas

        const difference = finalBalance - initialBalance;
        // console.log(finalBalance - initialBalance); - Prints out difference
        assert(difference > web3.utils.toWei('1.8', 'ether')); // Make sure difference is close to 2

        const players = await lottery.methods.getPlayers().call({from: accounts[0]});
        assert.equal(players.length, 0); // Checks if number of players is 0 in the lottery

        const balance = await lottery.methods.getBalance().call({from: accounts[0]});
        //console.log(balance);
        assert.equal(balance, 0); // Checks if balance is 0
    });
});