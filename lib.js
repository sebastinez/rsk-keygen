#!/usr/bin/env node
var wallet = require("./utils/wallet");
var bitcoin = require("./utils/bitcoin");
var CONFIG = require("./config.json");

var generateNewWallets = function(argh) {
  var bitcoinPrivateKey = wallet.generateWifPrivateKey(CONFIG.isTestnet);
  var rskPrivateKey = wallet.generateRskPrivateKey(bitcoinPrivateKey);
  var publicKey = wallet.generatePublicKey(rskPrivateKey);
  var bitcoinAddress = wallet.generateBitcoinAddress(publicKey, CONFIG.isTestnet);
  var rskAddress = wallet.generateRSKAddress(publicKey);

  result = {
    "Public Key     ": publicKey.toString("hex"),
    "BTC Private Key": bitcoinPrivateKey,
    "BTC Address    ": bitcoinAddress,
    "RSK Private Key": rskPrivateKey.toString("hex"),
    "RSK Address    ": "0x" + rskAddress.toString("hex")
  };

  console.log(result);
};

var generateRSKAddressFromBTCPrivateKey = function(argh) {
  var privateKey = argh.argv && argh.argv[0];
  var rskAddress = wallet.generateRSKAddressFromBitcoinPrivateKey(privateKey);
  if (privateKey == null || rskAddress == null) return;

  result = {
    "RSK Address": "0x" + rskAddress.toString("hex")
  };

  console.log(result);
};
