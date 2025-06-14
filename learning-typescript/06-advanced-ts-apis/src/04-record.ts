interface Transaction {
    transactionId: string,
    receiver: string,
    sender: string
}

// type Transactions = {
//     [key: string]: Transaction
// }




// another good way to define the same


type Transactions = Record<string, Transaction>

const txn1: Transaction = {
    transactionId:"1241",
    receiver: "4131",
    sender: "dfs1"
}

const txns: Transactions = {
    "124": txn1, 
}

console.log(txns);