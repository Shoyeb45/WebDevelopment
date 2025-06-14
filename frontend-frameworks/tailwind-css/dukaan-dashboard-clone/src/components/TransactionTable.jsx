export function TransactionTable({ transactions }) {
    return (
        <div>
            <table className="w-[100%]">
                <TableHeader />
                <TableBody transactions={transactions} />
            </table>
        </div>
    )
}

const tableRowStyling1 = "text-start p-2";
const tableRowStyling2 = "text-end p-2";

function TableHeader() {
    return (
        <thead className="bg-[#f2f2f2]">
            <tr className="w-[100%] text-[#4d4d4d] p-4" cellPadding="10px">
                <th className={tableRowStyling1}>Order ID</th>
                <th className={tableRowStyling1}>Status</th>
                <th className={tableRowStyling1}>Transaction ID</th>
                <th className={tableRowStyling1}>Refund Date</th>
                <th className={tableRowStyling2}>Order Amount</th>
            </tr>
        </thead>
    )
}

function TableBody({ transactions }) {
    console.log(transactions[0]);
    
    return (
        <tbody>
            {transactions.map((transaction) => {
                return <TableRow 
                    {...transaction}
                />
            })}
        </tbody>
    )
}

function TableRow({ 
    orderId,
    status,
    transactionId,
    refundDate,
    orderAmount
}) {
    console.log(orderId);
    
    return (
        <tr className="text-[#4d4d4d]">
            <td className={tableRowStyling1 + ` text-[#146eb4] font-medium`}>{orderId}</td>
            <td className={tableRowStyling1}>
                <Status status={status}/>
            </td>
            <td className={tableRowStyling1}>{transactionId}</td>
            <td className={tableRowStyling1}>{refundDate}</td>
            <td className={tableRowStyling2}>{`₹${orderAmount.toFixed(2)}`}</td>
        </tr>
    )
}

function Status({ status }) {
    const color = (status === "Processing" ? "[#999999]": 'green-600');
    return (
        <div className="flex gap-2 items-center text-center">
            <span className={`w-3 h-3 rounded-full  bg-${color} inline-block`}> </span>
            {status}
        </div>
    )
}