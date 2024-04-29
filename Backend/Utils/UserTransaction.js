import StellarSdk from 'stellar-sdk';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
const server = new Server("https://horizon-testnet.stellar.org/");
async function UserStellarTransaction(account, amount, KeyPair, destination) {


    try {
        const transaction = new StellarSdk.TransactionBuilder(account, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: destination,
                asset: StellarSdk.Asset.native(),
                amount: amount.toString()
            }))
            .setTimeout(180)
            .build();

        transaction.sign(KeyPair);

        return server.submitTransaction(transaction);



    } catch (error) {
        console.error("Error submitting transaction:", error.response.data);
        throw error;
    }
}


export default UserStellarTransaction;