// Emitter warning
require('events').EventEmitter.prototype._maxListeners = 100;

// import modules
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// create instance of web3 and provider
const web3 = new Web3(ganache.provider());
const provider = ganache.provider();

// pull in contracts
const compiledDoorPrize = require('../ethereum/_build/DoorPrize.json');

// variables used in setting up tests
let accounts;
let doorPrize;
let doorPrizeAddress;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    doorPrize = await new web3.eth.Contract(JSON.parse(compiledDoorPrize.interface))
    .deploy({ data: compiled.bytecode })
    .send({ from: accounts[0], gas: '1000000'});

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    )
}); 

describe ('Door Prize Contract', () => {
    it('deploys a contract', () => {
        assert.ok(doorPrize.options.address);
    });
});