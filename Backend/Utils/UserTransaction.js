import StellarSdk from 'stellar-sdk';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
const server = new Server("https://horizon-testnet.stellar.org/");
async function UserStellarTransaction(account, amount, KeyPair, destination) {

    const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET
    })
        .addOperation(StellarSdk.Operation.payment({
            destination: destination, // Admin account's public key
            asset: StellarSdk.Asset.native(),
            amount: amount.toString() // Amount of XLM to add to the admin account
        }))
        .setTimeout(180)
        .build();

    transaction.sign(KeyPair);

    const response = await server.submitTransaction(transaction);
    return response;
}

export default UserStellarTransaction;