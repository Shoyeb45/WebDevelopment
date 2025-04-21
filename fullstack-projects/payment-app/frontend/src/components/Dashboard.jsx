import { Intro } from "./Intro"
import { GrTransaction } from "react-icons/gr";
import { TransactionTable } from "./TransactionTable";
import { NavBar } from "./NavBar";


export function Dashboard({
    name,
    balance,
    transactions
}) {
    return (
        <div >
            <Intro name={name} balance={balance} />
            <div className="mt-4">
                <NavBar />
            </div>
                <TransactionHead />

            <TransactionTable transactions={transactions} />
        </div>
    )
}

function TransactionHead() {
    return (
        <div className="flex sm:text-5xl text-3xl  sm:justify-center items-center gap-4 p-3 font-semibold mt-5">
            <span>Recent Transactions</span>
            <span className="text-center flex items-center">
                <GrTransaction />
            </span>
        </div>
    )
}