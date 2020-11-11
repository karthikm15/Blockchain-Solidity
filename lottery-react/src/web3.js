// Import Libraries
import Web3 from 'web3';

/* For this application, will assume the user has Metamask installed on browser.
    - If that is the case, then Metamask will inject web3 v0.2 (bad version) into browser with its own provider.
    - We are using v1.0 (better version) so want to take our provider and put it in place of the provider that
      Metamask has created already on the website. This will allow us to use web3 v1.0 in the website.
 */

window.ethereum.enable();
const web3 = new Web3(window.web3.currentProvider);

export default web3;