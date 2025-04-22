import { IoLogOut } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Header({ isUserLoggedIn }) {
    const navigate = useNavigate();
    return (
        <header className="w-full flex justify-between p-1 py-1 border-b border-b-gray-500">
            <div 
                className="font-bold sm:text-4xl text-3xl sm:ms-14 ms-3 text-center flex items-center hover:cursor-pointer"
                onClick={() => navigate("/")}
            >
                EasyPay
            </div>

            <HeaderLeft navigate={navigate} isUserLoggedIn={isUserLoggedIn}></HeaderLeft>
        </header>
    );
}


function HeaderLeft({ isUserLoggedIn, navigate }) {

    if (!isUserLoggedIn) {
        return (
            <div className="sm:me-14 me-3 flex sm:gap-5 gap-2 items-center font-medium ">
                <button className="sm:p-3 p-1" onClick={() => navigate("/signin")}>Sign In</button>
                <button className="sm:p-3 p-1 border-1 rounded-3xl text-center w-25" onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
        )
    }
    return (
        <div className="sm:me-14 me-3 flex gap-5 items-center">
            <button className="p-1 text-2xl"><FaUserCircle /></button>
            <button className="p-1 text-3xl  ">
                <IoLogOut />
            </button>
        </div>
    )
}