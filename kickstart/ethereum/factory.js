// Will allow you to access already deployed CampaignFactory instance and reference it in later codes

import web3 from './web3'; // importing web3.js
import CampaignFactory from './build/CampaignFactory.json';

// References contract in this address
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xB32db08401fC433338C1617C68f43119eC4a7007'
);

export default instance;