const { networks } = require('bitcoinjs-lib');
const testnet = networks.testnet.wif;
const mainnet = networks.bitcoin.wif;
const Wallet = require('./utils/wallet');

let wallet = new Wallet(mainnet);
console.log(
  wallet
    .generateWifPrivateKey()
    .generatePublicKey()
    .generateRSKAddress()
    .encryptBIP38('Nuclearis2019')
    .decryptBIP38('Nuclearis2019')
    .toHex(['rskAddressFromPublicKey', 'privKey', 'publicKey'])
);
