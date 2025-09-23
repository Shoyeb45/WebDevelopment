import { GiPayMoney } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export function NavBar() {
    const navigate = useNavigate();

    return (
        <nav className="flex flex-wrap gap-4 p-6 bg-white rounded-2xl shadow-sm border border-indigo-100 justify-center">
            <div 
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md"
                onClick={() => navigate("/request")}
            >
                <div className="text-2xl text-purple-600">
                    <GiMoneyStack />
                </div>
                <button className="font-medium text-purple-700 hover:text-purple-800 whitespace-nowrap">
                    Request Money
                </button>
            </div>

            <div 
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 hover:from-indigo-100 hover:to-blue-100 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md"
                onClick={() => navigate("/users")}
            >
                <div className="text-2xl text-indigo-600">
                    <GiPayMoney />
                </div>
                <button className="font-medium text-indigo-700 hover:text-indigo-800 whitespace-nowrap">
                    Send Money
                </button>
            </div>
        </nav>
    )
}