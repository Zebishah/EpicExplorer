import StellarSdk from 'stellar-sdk';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
const server = new Server("https://horizon-testnet.stellar.org/");
async function StellarTransaction(account, xlm, userKeypair) {

    // Transaction to add balance to the admin account


    const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET
    })
        .addOperation(StellarSdk.Operation.payment({
            destination: process.env.ADMIN_ACCOUNT_ID,
            amount: xlm.toString(), // Admin account's public key
            asset: StellarSdk.Asset.native()

        }))
        .setTimeout(180)
        .build();

    // Sign the transaction with the admin account's secret key
    transaction.sign(userKeypair);


    const response = await server.submitTransaction(transaction);

    return response;
}

export default StellarTransaction;