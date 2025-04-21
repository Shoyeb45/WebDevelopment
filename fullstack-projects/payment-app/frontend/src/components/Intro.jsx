import { GiWallet } from "react-icons/gi";


export function Intro({
    name,
    balance
}) {
    return (
        <div className="flex flex-col  gap-8  items-start ">
            <div className="sm:ms-14 ms-4 sm:text-6xl text-5xl mt-10">Hello {name}</div>
            <div className="flex items-center gap-3 sm:ms-14 ms-4">
                <div className="font-normal text-3xl">
                    Current Balance: ₹{balance.toLocaleString()}
                </div>
                <div className="text-2xl">
                    <GiWallet />
                </div>
            </div>
        </div>
    );
} 