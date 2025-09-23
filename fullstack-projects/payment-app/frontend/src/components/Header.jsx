import { IoLogOut } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isUserLoggedInAtom } from "../stores/state";
import { isAccessTokenExpired } from "../utils/helperFunctions";
import { useEffect } from "react";

export function Header() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(isUserLoggedInAtom);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isAccessTokenExpired(localStorage.getItem("accessToken"))) {
            setIsUserLoggedIn(true);
        } 
        else {
            setIsUserLoggedIn(false);
        }
    }, [isUserLoggedIn]);
    
    return (
        <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
            <div 
                className="font-bold text-2xl sm:text-3xl text-indigo-600 cursor-pointer transition-colors duration-300 hover:text-indigo-800 flex items-center gap-2"
                onClick={() => navigate("/")}
            >
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">EasyPay</span>
            </div>

            <HeaderLeft navigate={navigate} isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />
        </header>
    );
}

function HeaderLeft({ 
    isUserLoggedIn,
    navigate,
    setIsUserLoggedIn 
}) {

    function logOut() {
        localStorage.removeItem("accessToken");
        setIsUserLoggedIn(false);
        navigate("/");
    } 
    
    if (!isUserLoggedIn) {
        return (
            <div className="flex gap-4 items-center">
                <button 
                    className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-sm text-sm sm:text-base"
                    onClick={() => navigate("/signin")}
                >
                    Sign In
                </button>
                <button 
                    className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base"
                    onClick={() => navigate("/signup")}
                >
                    Sign Up
                </button>
            </div>
        )
    }
    
    return (
        <div className="flex gap-3 items-center">
            <button 
                className="p-2 text-indigo-600 hover:text-indigo-800 transition-all duration-300 hover:scale-110 rounded-full hover:bg-indigo-50"
                onClick={() => { navigate("/profile") }}
                title="Profile"
            >
                <FaUserCircle size={24} />
            </button>
            <button 
                className="p-2 text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 rounded-full hover:bg-red-50" 
                onClick={logOut}
                title="Logout"
            >
                <IoLogOut size={24} />
            </button>
        </div>
    )
}