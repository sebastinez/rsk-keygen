const ecc = require("tiny-secp256k1");
const crypto = require("crypto");
const ethereumjs = require("ethereumjs-util");
const wif = require("wif");
const bip38 = require("bip38");

class Wallet {
  constructor(_network) {
    this.network = _network;
  }
  encryptBIP38(passphrase) {
    let decoded = wif.decode(this.wifPrivKey);
    this.decodedPrivKey = decoded.privateKey;
    this.encryptedKey = bip38.encrypt(
      decoded.privateKey,
      decoded.compressed,
      passphrase
    );
    return this;
  }
  decryptBIP38(passphrase) {
    let key = bip38.decrypt(this.encryptedKey, passphrase, (status) => {});
    this.decryptedKey = wif.encode(0x80, key.privateKey, key.compressed);
    return this;
  }
  generatePrivateKey() {
    do {
      this.privKey = crypto.randomBytes(32);
    } while (!ecc.isPrivate(this.privKey));

    return this;
  }
  generateWifPrivateKey() {
    this.generatePrivateKey();
    this.wifPrivKey = wif.encode(this.network, this.privKey, true);
    return this;
  }
  generatePublicKey() {
    if (this.privKey == null) {
      console.error("Must specify a privateKey");
      return;
    }

    if (ecc.isPrivate(this.privKey)) {
      this.publicKey = ecc.pointFromScalar(this.privKey, true);
      return this;
    }
  }
  generateRSKAddress() {
    if (this.publicKey == null) {
      console.error("Must specify a publicKey");
      return;
    }
    this.rskAddressFromPublicKey = ethereumjs.pubToAddress(
      Buffer.from(this.publicKey),
      true
    );
    return this;
  }
  toHex(fields) {
    fields.forEach((element) => {
      this[element] = this[element].toString("hex");
    });
    return this;
  }
}

module.exports = Wallet;
