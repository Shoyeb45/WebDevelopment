import { jwtDecode } from "jwt-decode";
import { FaMoneyBillTransfer } from "react-icons/fa6";



export function TransactionTable({ transactions }) {
    return (
        <div>
            {transactions.map((txn) => {
                return <Transaction transaction={txn} key={txn._id}/>
            })}
            {/* <Transaction transaction={transactions}/> */}
        </div>
    )
}

function Transaction({ transaction }) {
    // find what type of transaction, it is?
    // Credit or Debit
    
    function getColor(isCredit) {
        return (isCredit? "green": "red");
    }
    const options = {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'  // optional, depends on your needs
      };

    const id = jwtDecode(localStorage.getItem("accessToken"))._id;
    const date = new Date(transaction.createdAt);
    const formatted = date.toLocaleString('en-US', options);
    console.log(formatted);
    
    const [datePart, timePart] = formatted.split(' ');
    console.log(timePart);
    
    const finalFormat = `${datePart}, ${timePart}`;
    
    
    const isCredit = (transaction.senderUser._id === id? false: true);
    return (
        <div className="flex p-4 justify-between items-center sm:ms-10" key={transaction._id}>
            <div className="flex items-center gap-6">
                <div className={"text-white w-12 h-12 rounded-full text-center flex items-center justify-center text-3xl " + ` bg-${getColor(isCredit)}-400`}>
                    <FaMoneyBillTransfer />
                </div>
                <div className=" flex gap- flex-col">
                    <h4 className="text-2xl font-bold">{(!isCredit? transaction.receiverUser.firstName + " " + transaction.receiverUser.lastName: transaction.senderUser.firstName + " " + transaction.senderUser.lastName)}</h4>
                    <p>{isCredit? "Received On ": "Paid On "}{formatted}</p>
                </div>
            </div>
            

            <div className="flex gap-1 flex-col sm:me-12 ">
                <div className={`text-2xl text-${getColor(isCredit)}-600`}>{isCredit?"+": "-"}₹{transaction.amount}</div>
                <div className="text-xl text-end">{isCredit? "Credit": "Debit"}</div>
            </div>
        </div>
    )
}