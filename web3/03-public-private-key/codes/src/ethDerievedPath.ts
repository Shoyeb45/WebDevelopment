import { mnemonicToSeedSync } from "bip39";
import { HDNodeWallet } from "ethers";

// 0x6118316bd046956F556899F9982498A785DF4De4
const mnemonic = "my original mnemonic";
const seed = mnemonicToSeedSync(mnemonic);

const path = "m/44'/60'/0'/0/0"; // Note: added /0 at the end for the first account
const hdNode = HDNodeWallet.fromSeed(seed);
const child = hdNode.derivePath(path);

// This will give you the Ethereum address
console.log("Address:", child.address);

// This is the public key (compressed)
console.log("Public Key:", child.publicKey);

// If you want the uncompressed public key
console.log("Uncompressed Public Key:", child.signingKey.compressedPublicKey);
