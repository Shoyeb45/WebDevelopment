import { GiWallet } from "react-icons/gi";
import { proper, getUser } from "../utils/helperFunctions.js";
import { useRecoilValueLoadable } from "recoil";
import { balanceAtom } from "../stores/state.js";


export function Intro() {
    const userInfo = getUser();
    const name = proper(userInfo?.firstName) + " " + proper(userInfo?.lastName);

    return (
        <div className="flex flex-col  gap-8  items-start ">
            <div className="sm:ms-14 ms-4 sm:text-6xl text-5xl mt-10">Hello {name}</div>
            <div className="flex items-center gap-3 sm:ms-14 ms-4">
                <div className="font-normal text-3xl flex  gap-1">
                    Current Balance: 
                    <ShowBalance />
                    
                </div>
                <div className="text-2xl">
                    <GiWallet />
                </div>
            </div>
        </div>
    );
} 

function ShowBalance() {
    const balance = useRecoilValueLoadable(balanceAtom);    
    if (balance.state === "loading") {
        return <div className="font-normal text-3xl">
            fetching balance...
        </div>
    }

    return (
        <div className="font-normal text-3xl">
            ₹{balance.contents.toLocaleString()}
        </div>
    )
}