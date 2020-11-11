// When import this, will be able to reference Metamask provider

import Web3 from 'web3';

// window.web3.currentProvider - can't directly access Window - different permissions in next.js rather than create-react-app
//const web3 = new Web3(window.web3.currentProvider);

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') { // Can use typeof to see if window undefined - will do this if rendering on browser
    // We are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
} else { // Rendering on server - window is undefined
    // We are in the server OR user not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/2cd4d4cb6df64ee5bac3b0cf76a0ac18' // Infura address
    );
    web3 = new Web3(provider);
}

export default web3;