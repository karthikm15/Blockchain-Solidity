const HDWalletProvider = require('truffle-hdwallet-provider'); // Provider for Infura - for deploying to an actual network (Rinkeby or Ethereum main network)
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'doll dragon sport tent camera engage blame wrist risk such primary admit', //account mneumonic
    'https://rinkeby.infura.io/v3/2cd4d4cb6df64ee5bac3b0cf76a0ac18' // get from creating a new project on infura.io (Rinkeby)
);

const web3 = new Web3(provider);

// Can only use async/await inside a function, which is why we're putting code in function rather than just writing it outside
const deploy = async () => {
    const accounts = await web3.eth.getAccounts(); // mneumonic can create multiple accounts - just taking the first few
    console.log('Attempting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({gas: '1000000', from: accounts[0]});
    
    console.log('Contract deployed to ', result.options.address)
    console.log(interface)
};
deploy();