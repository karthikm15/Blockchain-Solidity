const path = require('path');
const fs = require('fs-extra'); // Working with fs-extra module (similar with some extra functions) now, not the fs module
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // Removes the build folder (also removes all the files in build folder)

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // creates build folder
console.log (output)
// for in loops - iterating over keys in an object
// Key will either be :Campaign or :FactoryCampaign
// Building a path to the build folder

// First argument of outputJSONSync - moving to folder path
// Second argument of outputJSONSync - the data of the contract itself
for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}