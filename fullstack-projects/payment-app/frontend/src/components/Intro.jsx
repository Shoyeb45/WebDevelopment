import { GiWallet } from "react-icons/gi";
import { proper, getUser } from "../utils/helperFunctions.js";
import { useRecoilValueLoadable } from "recoil";
import { balanceAtom } from "../stores/state.js";

export function Intro() {
    const userInfo = getUser();
    const name = proper(userInfo?.firstName) + " " + proper(userInfo?.lastName);

    return (
        <div className="flex flex-col gap-6 items-start px-4 sm:px-8 pt-8">
            <div className="sm:text-5xl text-4xl font-bold text-gray-800">
                Hello, <span className="text-indigo-600">{name}</span>
            </div>
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 shadow-sm">
                <div className="font-semibold text-2xl sm:text-3xl text-gray-700 flex items-center gap-2">
                    <span>Current Balance:</span>
                    <ShowBalance />
                </div>
                <div className="text-3xl text-indigo-600">
                    <GiWallet />
                </div>
            </div>
        </div>
    );
} 

function ShowBalance() {
    const balance = useRecoilValueLoadable(balanceAtom);    
    
    if (balance.state === "loading") {
        return (
            <div className="font-semibold text-3xl text-gray-500 animate-pulse">
                Loading...
            </div>
        )
    }

    return (
        <div className="font-bold text-3xl text-indigo-600">
            ₹{balance.contents.toLocaleString()}
        </div>
    )
}