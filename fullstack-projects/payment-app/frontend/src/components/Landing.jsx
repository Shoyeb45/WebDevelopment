import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { isUserLoggedInAtom } from "../stores/state";

export function Landing() {
    const isUserLoggedIn = useRecoilValue(isUserLoggedInAtom);
    
    const navigate = useNavigate();
    console.log(isUserLoggedIn);
    
    function navigator() {
        if (!isUserLoggedIn) {
            navigate("/signup");
            return;
        }
        navigate("/dashboard");
        return;
    }
    return (
        <main className="sm:gap-12 gap-7 h-full flex flex-col font-serif items-center justify-center">
            <div className="flex flex-col items-center lg:text-7xl md:text-5xl text-2xl gap-5">
                <p>EasyPay: Digital Payment</p> 
                <p>Made Simpler</p>
            </div>
            <button 
                className="border-2 p-3 sm:text-2xl  sm:rounded-2xl rounded-xl"
                onClick={navigator}
            >
                Get Started
            </button>
        </main>
    )
}