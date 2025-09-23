import { jwtDecode } from "jwt-decode";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useRecoilValueLoadable } from "recoil";
import { transactionsAtom } from "../stores/state";
import { Loading } from "./LoadingSpinner";

export function TransactionTable() {
    const transactions = useRecoilValueLoadable(transactionsAtom);

    if (transactions.state === "loading") {
        return (
            <div className="text-2xl p-8 flex justify-center">
                <Loading message={"Fetching transactions"} />
            </div>
        )
    }

    if (transactions.state === "hasValue" && transactions.contents.length === 0) {
        return (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-dashed border-gray-300">
                <div className="text-gray-500 text-xl font-medium">No transactions yet</div>
                <div className="text-gray-400 mt-2">Make your first payment to see transactions here</div>
            </div>
        )
    }
    
    return (
        <div className="space-y-4">
            {transactions.state === "hasValue" && transactions.contents.map((txn) => {
                return <Transaction transaction={txn} key={txn._id}/>
            })}
        </div>
    )
}

function Transaction({ transaction }) {
    const options = {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    };

    const id = jwtDecode(localStorage.getItem("accessToken"))._id;
    const date = new Date(transaction.createdAt);
    const formatted = date.toLocaleString('en-US', options);
    
    const isCredit = (transaction.senderUser._id === id ? false : true);
    const textColor = (isCredit ? "text-green-600" : "text-red-600");
    const bgColor = (isCredit ? "bg-green-100" : "bg-red-100");
    const iconColor = (isCredit ? "text-green-600" : "text-red-600");
    const borderColor = (isCredit ? "border-green-200" : "border-red-200");
    
    return (
        <div className={`flex p-5 rounded-xl bg-white shadow-sm border-l-4 ${isCredit ? 'border-l-green-500' : 'border-l-red-500'} hover:shadow-md transition-all duration-300`}>
            <div className="flex items-center gap-5 flex-1">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${bgColor} ${iconColor}`}>
                    <FaMoneyBillTransfer size={28} />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-xl font-semibold text-gray-800">
                        {isCredit ? 
                            `${transaction.senderUser.firstName} ${transaction.senderUser.lastName}` : 
                            `${transaction.receiverUser.firstName} ${transaction.receiverUser.lastName}`
                        }
                    </h4>
                    <p className="text-gray-500 text-sm">
                        {isCredit ? "Received on " : "Paid on "}{formatted}
                    </p>
                </div>
            </div>
            
            <div className="flex flex-col items-end gap-1 min-w-[120px]">
                <div className={`text-2xl font-bold ${textColor}`}>
                    {isCredit ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
                    {isCredit ? "CREDIT" : "DEBIT"}
                </div>
            </div>
        </div>
    )
}