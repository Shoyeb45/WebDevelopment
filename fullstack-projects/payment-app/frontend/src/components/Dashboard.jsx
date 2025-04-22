import { Intro } from "./Intro"
import { GrTransaction } from "react-icons/gr";
import { TransactionTable } from "./TransactionTable";
import { NavBar } from "./NavBar";


export function Dashboard() {
    return (
        <div >
            <Intro />
            <div className="mt-4">
                <NavBar />
            </div>
                <TransactionHead />

            <TransactionTable />
        </div>
    )
}

function TransactionHead() {
    return (
        <div className="flex sm:text-5xl text-2xl  sm:justify-center justify-between items-center gap-4 p-3 font-semibold mt-5">
            <span>Recent Transactions</span>
            <span className="text-center flex items-center">
                <GrTransaction />
            </span>
        </div>
    )
}