const fs = require('fs');

const { readFileSync } = require('fs');
const LoomTruffleProvider = require('loom-truffle-provider');

const chainId = 'default';
const writeUrl = 'http://127.0.0.1:46658/rpc';
const readUrl = 'http://127.0.0.1:46658/query';
const privateKey = readFileSync('./loom_private_key', 'utf-8');

const loomTruffleProvider = new LoomTruffleProvider(
    chainId,
    writeUrl,
    readUrl,
    privateKey,
);
const loomProvider = loomTruffleProvider.getProviderEngine();
const accounts = loomTruffleProvider.createExtraAccounts(112);

let newAccount = loomProvider.accounts;
let newAccounts = [];

for (let [key, value] of loomProvider.accounts) {
    newAccounts.push(key + '\n');
}

fs.writeFile('newAccounts.txt', newAccounts, (err) => {
    if (err) throw err;
    console.log('Saved!');
});

module.exports = {
    networks: {
        local_loom: {
            provider: loomTruffleProvider,
            network_id: '*',
        },
    },
    contracts_directory: './contracts/',
    contracts_build_directory: './src/contracts/',
    compilers: {
        solc: {
            version: '0.6.2',
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
};
