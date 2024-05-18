import StellarSdk from 'stellar-sdk';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
const server = new Server("https://horizon-testnet.stellar.org/");
async function StellarTransaction(account, xlm, adminKeyPair, destinationAcc) {
    try {
        // Load the account object
        await account;

        // Transaction to add balance to the user account
        const transaction = new StellarSdk.TransactionBuilder(account, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: destinationAcc,
                amount: xlm.toString(),
                asset: StellarSdk.Asset.native()
            }))
            .setTimeout(180)
            .build();

        // Sign the transaction with the admin account's secret key
        transaction.sign(adminKeyPair);
        // Submit the transaction to the Stellar network
        const response = await server.submitTransaction(transaction);
        return response;
    } catch (error) {
        console.error('Error in StellarTransaction:', error.message);
        throw error;
    }
}


export default StellarTransaction;