import { useNavigate } from "react-router-dom"

export function Landing({ isUserLoggedIn }) {

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