import { Intro } from "./Intro"
import { GrTransaction } from "react-icons/gr";
import { TransactionTable } from "./TransactionTable";
import { NavBar } from "./NavBar";
import { useRecoilValue } from "recoil";
import { isUserLoggedInAtom } from "../stores/state.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Dashboard() {
    const isUserLoggedIn = useRecoilValue(isUserLoggedInAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/signin");
            return;
        }
    }, []);
    
    
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