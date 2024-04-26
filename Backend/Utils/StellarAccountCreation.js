import StellarSdk from 'stellar-sdk';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
const server = new Server("https://horizon-testnet.stellar.org/");
async function StellarTransaction(adminAccount, balance, adminKeyPair) {
    const transaction = new StellarSdk.TransactionBuilder(adminAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
    })
        .addOperation(
            StellarSdk.Operation.createAccount({
                destination: sourceAccountId, // New user's account ID
                startingBalance: balance.toString(),
                // Fund the account with 2.5 XLM
            })

        )
        .setTimeout(180)
        .build();

    // Sign the transaction with the admin's secret seed
    transaction.sign(adminKeyPair);

    const response = await server.submitTransaction(transaction);

    return response;
}
export default StellarTransaction;