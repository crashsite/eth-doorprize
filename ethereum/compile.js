// import modules
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const ethContract = 'DoorPrize.sol';

// delete build directory
const buildPath = path.resolve(__dirname,'_build');
fs.removeSync(buildPath);

// read in contracts file
const contractPath = path.resolve(__dirname, 'contracts', ethContract);
const source = fs.readFileSync(contractPath, 'utf8');

// compile the sol file
output = solc.compile(source,1).contracts;

// create build folder
fs.ensureDirSync(buildPath);

// write out each contract into it's own files
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
}



