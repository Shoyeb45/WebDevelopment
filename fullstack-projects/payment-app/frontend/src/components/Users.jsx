import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
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
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
                <Loading message={"Finding users for you..."} />
            </div>
        )
    }
    
    const id = getUser(localStorage.getItem("accessToken"))?._id;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-3xl font-bold text-gray-800 mb-8 text-center">Send Money to Friends</div>
                <div className="mb-8">
                    <UserSearchBar handleFilter={handleFilter}/>
                </div>
                <div className="space-y-4">
                    {users.contents.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-dashed border-gray-300">
                            <div className="text-gray-500 text-xl font-medium">No users found</div>
                            <div className="text-gray-400 mt-2">Try adjusting your search criteria</div>
                        </div>
                    ) : (
                        users.contents.map((user) => {
                            if (user._id.toString() === id.toString()) {
                                return null;
                            }
                            return <User {...user} key={user._id} id={user._id}/>
                        })
                    )}
                </div>
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

    const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-indigo-200">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-bold flex items-center justify-center shadow-md">
                        {initials}
                    </div>
                    <div className="text-xl font-semibold text-gray-800">{firstName} {lastName}</div>
                </div>

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
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                onClick={() => {                    
                    setIsModalOpen(true)
                }}
            >
                <FaMoneyBillTransfer className="text-lg" />
                <span>Send Money</span>
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                name={name}
                id={id}
            />
        </>
    )
}

function UserSearchBar({ handleFilter }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1">
            <form onSubmit={handleFilter} className="flex">
                <input 
                    name="filter" 
                    type="text" 
                    placeholder="Search for friends by name or username..."
                    className="flex-1 py-3 px-4 text-gray-700 placeholder-gray-500 focus:outline-none rounded-l-xl"
                />
                <button 
                    type="submit"
                    className="px-6 bg-indigo-600 text-white rounded-r-xl hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                >
                    <IoSearchOutline className="text-xl" />
                </button>
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
            const amount = parseFloat(form.get("amount"));
            
            if (balance < amount) {
                errorRef.current.className = "text-center text-red-600 bg-red-50 p-3 rounded-lg font-medium mt-4";
                errorRef.current.innerHTML = "Insufficient balance for this transaction";
                return;
            }

            let response = await fetch(`${domain}/account/transaction`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ receiverId: id, amount: amount })
            });
            response = await response.json();

            if (!response.ok) {
                errorRef.current.className = "text-center text-red-600 bg-red-50 p-3 rounded-lg font-medium mt-4";
                errorRef.current.innerHTML = "Transaction Failed: " + (response.message || "Please try again");
                return;
            }
            
            errorRef.current.className = "text-center text-green-600 bg-green-50 p-3 rounded-lg font-medium mt-4";
            errorRef.current.innerHTML = "Transaction Completed Successfully!";
            setBalance(response.availableBalance);
            
            // Close modal after 2 seconds
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            errorRef.current.className = "text-center text-red-600 bg-red-50 p-3 rounded-lg font-medium mt-4";
            errorRef.current.innerHTML = "An error occurred. Please try again.";
        }
    }
    
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative transform transition-all duration-300 scale-100">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300"
                    onClick={onClose}
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Send Money</h2>
                
                <div className="text-6xl flex justify-center mb-4 text-indigo-600">
                    <FaUserCircle />
                </div>

                <div className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    {name}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-4">
                    <div className="text-sm text-gray-600 mb-2">Available Balance</div>
                    <div className="text-2xl font-bold text-indigo-600">₹{balance.toLocaleString()}</div>
                </div>

                <form onSubmit={transferMoney} className="space-y-4">
                    <div className="relative">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                            Amount to send
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MdOutlineCurrencyRupee className="text-gray-500" />
                            </div>
                            <input 
                                type="number" 
                                name="amount" 
                                id="amount" 
                                placeholder="Enter amount"
                                min="1"
                                step="1"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300"
                                required
                            />
                        </div>
                    </div>

                    <div ref={errorRef} className="min-h-12 flex items-center justify-center">
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        <RiSecurePaymentLine className="text-lg" />
                        <span>Send Payment</span>
                    </button>
                </form>
            </div>
        </div>
    );
};