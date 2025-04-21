import { GiPayMoney } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


export function NavBar() {
    const navigate = useNavigate();

    return (
        <nav className="flex p-4 text-xl gap-12 justify-">

            <div className="sm:ms-10 flex items-center border-1 rounded-2xl">
                <div className="p-2 text-2xl">
                    <GiMoneyStack />
                </div>
                <button className="p-2" >Request Money</button>
            </div>

            <div className="flex items-center border-1 rounded-2xl hover:cursor-pointer" onClick={() => navigate("/users")}>
                <div className="p-2 text-2xl">
                    <GiPayMoney />
                </div>
                <button className="p-2 hover:cursor-pointer">Send Money</button>
            </div>
        </nav>
    )
}