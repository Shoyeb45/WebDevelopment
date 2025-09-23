import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserLoggedInAtom } from "../stores/state";

export function Landing() {
    const isUserLoggedIn = useRecoilValue(isUserLoggedInAtom);
    
    const navigate = useNavigate();
    
    function navigator() {
        if (!isUserLoggedIn) {
            navigate("/signup");
            return;
        }
        navigate("/dashboard");
        return;
    }
    
    return (
        <main className="sm:gap-12 gap-7  flex flex-col font-serif items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen px-4">
            <div className="flex flex-col items-center lg:text-7xl md:text-5xl text-3xl gap-6 text-gray-800">
                <p className="font-bold  bg-gradient-to-r text-purple-600 bg-clip-text ">EasyPay: Digital Payment</p> 
                <p className="font-semibold text-gray-700">Made Simpler</p>
            </div>
            <button 
                className="border-2 border-indigo-600 p-4 sm:text-2xl sm:rounded-2xl rounded-xl hover:cursor-pointer bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={navigator}
            >
                Get Started
            </button>
        </main>
    )
}