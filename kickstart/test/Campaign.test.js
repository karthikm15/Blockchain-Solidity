// Two contracts closely related - so will keep the tests in the same test file

const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts; // listing of accounts in ganache netwokr
let factory; // deployed instance going to create
let campaignAddress; // use factory to make instance of campaign and assign to address variable
let campaign; // make an instance of campaign using factory

beforeEach(async() => {
    accounts = await web3.eth.getAccounts()

    // Creates the idea of the contract and now have to deploy it
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode})
        .send({ from: accounts[0], gas: '1000000'});

    // Deploying a contract with a minimum contribution of 100 wei
    // Notice that the argument is in a string variable, not an integer
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    // Get the campaign itself (otherwise will get lost)
    // Return an array of addresses for deployed campaigns
    // Want to take the first element and take the first variable ([campaignAddress])
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    // Using address to put inside of the campaign using the interface shown in the smart contract
    // Already been deployed so do not need to do .deploy() or .send()
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

// Remember before running tests with Mocha:
// Change the package.json (scripts --> test) to Mocha

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as the campaign manager', async () => {
        // When create public variable, then function to call it automatically gets created
        const manager = await campaign.methods.manager().call()
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute money', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        
        // If call approvers and pass in account, if boolean is true, then approver
        const isContributer = await campaign.methods.approvers(accounts[1]).call()
        // If false, not a contributor
        assert(isContributer);
    });

    it ('requires a minimum contribution', async() => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            // Assertion of false if it doesn't work
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it ('allows a manager to make a payment request', async () => {
        await campaign.methods
            .createRequest('Buy batteries', '100', accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        // .call() if you are not making any changes
        // Only have access to first five properties - can't access mapping
        const request = await campaign.methods.requests(0).call()

        assert.equal('Buy batteries', request.description);
    });

    it ('processes requests', async () =>  {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods
            .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance  = web3.utils.fromWei(balance, 'ether');
        // Takes a string and converts it to decimal number
        balance = parseFloat(balance);
        console.log(balance);
        assert (balance > 104);
    });
});