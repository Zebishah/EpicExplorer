import StellarSdk from 'stellar-sdk';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
const server = new Server("https://horizon-testnet.stellar.org/");

const KeysCreations = async () => {

    const sourcePair = StellarSdk.Keypair.random();
    const sourceAccountId = sourcePair.publicKey();
    const sourceSecretSeed = sourcePair.secret();
    return {
        sourceAccountId,
        sourceSecretSeed
    };
}
export default KeysCreations;