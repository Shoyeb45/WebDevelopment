import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState,useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { domain, getUser, proper } from "../utils/helperFunctions.js";
import { useRecoilStateLoadable, useRecoilState, useRecoilValue } from "recoil";
import { balanceAtom, isUserLoggedInAtom, usersAtom } from "../stores/state.js";
import { Loading } from "./LoadingSpinner.jsx";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useRecoilStateLoadable(usersAtom);
    const isUserLoggedIn = useRecoilValue(isUserLoggedInAtom);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/signin")
        }
    }, []);

    async function handleFilter(event) {
        event.preventDefault();
        try {
            const form = new FormData(event.target);
            const filter = form.get("filter");
            const api = filter ? `${domain}/user/users/?filter=${filter}`: `${domain}/user/users`;
            let response = await fetch(api, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            response = await response.json();

            if (!response.ok) {
                return;
            }

            setUsers((user) => response.users);
        } catch (error) {
            console.log(error);
            return;
        }
    }

    if (users.state === "loading") {
        return (
            <div className="p-4">
                <Loading message={"Getting all the users"} />
            </div>
        )
    }
    
    const id = getUser(localStorage.getItem("accessToken"))?._id;

    return (
        <div className="flex flex-col p-2  gap-10">
            <div className="mt-4">
                <UserSearchBar handleFilter={handleFilter}/>
            </div>
            <div className="flex flex-col gap-6">

            {users.contents.map((user) => {
                if (user._id.toString() === id.toString()) {
                    return (<></>)
                }
                return <User {...user} key={user._id} id={user._id}/>
            })}

            </div>
        </div>
    )
}

const User = ({
    firstName,
    lastName,
    _id
}) => {
    firstName = proper(firstName);
    lastName = proper(lastName);


    return (
        <div  className="flex  justify-between w-full items-center">

            <div className="flex sm:gap-6 gap-3 items-center sm:ms-13 ms-3">
                <div className="sm:text-xl sm:w-12 sm:h-12 w-8 h-8 rounded-full sm:p-0 p-1.5 bg-green-300 text-center flex items-center justify-center">
                    {firstName?.charAt(0) + lastName?.charAt(0)}
                </div>
                <div className="sm:text-2xl ">{firstName + " " + lastName}</div>
            </div>

            <div>
                <SendMoneyButton name={firstName + " " + lastName} id={_id}/>
            </div>
            
        </div>
    )
}
function SendMoneyButton({ name, id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button 
                className="sm:p-2 p-1 px-6 border-1 rounded-3xl flex items-center justify-center gap-3 sm:me-13 me-3"
                onClick={() => {                    
                    setIsModalOpen(true)
                }}
            >
                <div className="sm:text-xl">Send Money</div>
                <div 
                    className="sm:text-2xl text-xl sm:p-0.5" 
                >
                    <FaMoneyBillTransfer />
                </div>
                
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                name={name}
                id={id}
            ></Modal>
        </>
    )
}



function UserSearchBar({ handleFilter }) {

    return (
        <div>
            <form action="" onSubmit={handleFilter}>
                <div className="border-1 sm:ms-14 sm:me-14 ms-3 me-3 flex rounded-xl justify-between" >
                    <input 
                        name="filter" 
                        type="text" 
                        placeholder="Enter text to search your friend"
                        className="w-full p-1 placeholder:ms-3 border-r-1 focus:outline-none"
                    />
                    <button 
                        className="text-xl p-2 bg-gray-300 h-full rounded-r-xl"
                        
                    >
                        <IoSearchOutline />
                    </button>

                </div>
            </form>
        </div>
    )
}

const Modal = ({ isOpen, onClose, name, id }) => {
    const errorRef = useRef();
    const [balance, setBalance] = useRecoilState(balanceAtom);

    async function transferMoney(event) {
        try {
            event.preventDefault();
            const form = new FormData(event.target);
            
            if (balance < form.get("amount")) {
                errorRef.current.class = "text-center text-red-500";
                errorRef.current.innerHTML = "Low Balance";
                return;
            }

            let response = await fetch(`${domain}/account/transaction`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ receiverId: id, amount: form.get("amount") })
            });
            response = await response.json();

            if (!response.ok) {
                errorRef.current.class = "text-center text-red-500";
                errorRef.current.innerHTML = "Transaction Failed";
                return;
            }
            errorRef.current.class = "text-center text-green-500";
            errorRef.current.innerHTML = "Transaction Completed";
            setBalance(response.availableBalance);
            return;
        } catch (error) {
            return;
        }
    }
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50  ">
            <div className="flex flex-col gap-3 bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center">Send Money To Your friend</h2>
                <div className="text-8xl flex justify-center">
                    <FaUserCircle />
                </div>

                <div className="text-4xl text-center p-2">
                    {name}
                </div>

                <div className="flex flex-col justify-center">
                    <form 
                        action="" 
                        className="flex flex-col justify-center items-center"
                        onSubmit={transferMoney}
                    >
                        <div className="flex items-center border-1 p-1 w-full">
                            <label htmlFor="amount" className="p-1">
                                <MdOutlineCurrencyRupee />
                            </label>
                            <input 
                                type="text" 
                                name="amount" 
                                id="amount" 
                                placeholder="Enter Amount"
                                className="focus:outline-none w-full placeholder:px-1.5"
                            />
                        </div>

                        <div className="text-center" ref={errorRef}>
                        </div>
                        <button className="text-xl flex items-center justify-center text-white bg-green-500 p-1  mt-5 gap-2 border-2 rounded-xl w-[30%]">
                            <div>Pay</div>
                            <div className="">
                                <RiSecurePaymentLine />
                            </div>
                        </button>
                    </form>
                </div>
            </div>
      </div>
    );
};
  