import { Intro } from "./Intro";
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
        <div className="min-h-screen bg-gray-50">
            <Intro />
            <div className="mt-6 px-4 sm:px-8">
                <NavBar />
                <TransactionHead />
                <div className="mt-6">
                    <TransactionTable />
                </div>
            </div>
        </div>
    )
}

function TransactionHead() {
    return (
        <div className="flex sm:text-4xl text-2xl justify-between items-center gap-4 p-4 font-semibold mt-8 bg-white rounded-xl shadow-sm border-l-4 border-indigo-600">
            <span className="text-gray-800 font-bold">Recent Transactions</span>
            <span className="text-indigo-600">
                <GrTransaction size={32} />
            </span>
        </div>
    )
}