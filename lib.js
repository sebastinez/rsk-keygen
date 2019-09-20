const { networks } = require("bitcoinjs-lib");
const testnet = networks.testnet.wif;
const mainnet = networks.bitcoin.wif;
const Wallet = require("./utils/wallet");

let wallet = new Wallet(mainnet);
/* wallet.privKey = Buffer.from("0829e8a1e7f48944d79ffc85e9344761629dbd8298508b9c6690775da018e5f3", "hex");
wallet.wifPrivKey = "KwVaba6XJKTZCmsPAZaaV3dKXGpzdtEE3Neh1ehmLvidKfpyry3n"; */
console.log(
  wallet
    .generateWifPrivateKey()
    .generatePublicKey()
    .generateRSKAddress()
    .encryptBIP38("Nuclearis2019")
    .toHex(["rskAddressFromPublicKey", "privKey", "publicKey"])
);
