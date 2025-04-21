import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";


export const Users = ({ users }) => {
    
    return (
        <div className="flex flex-col p-2  gap-10">
            <div className="mt-4">
                <UserSearchBar />
            </div>
            <div className="flex flex-col gap-6">

            {users.map((user) => {
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

            <div className="flex gap-6 items-center sm:ms-13 ms-3">
                <div className="text-xl w-12 h-12 rounded-full bg-green-300 text-center flex items-center justify-center">
                    {firstName?.charAt(0) + lastName?.charAt(0)}
                </div>
                <div className="text-2xl">{firstName + " " + lastName}</div>
            </div>

            <div>
                <SendMoneyButton name={firstName + " " + lastName}/>
            </div>
            
        </div>
    )
}
function SendMoneyButton({ name }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button 
                className="p-2 px-6 border-1 rounded-3xl flex items-center justify-center gap-3 sm:me-13 me-3"
                onClick={() => {
                    console.log("Model opened");
                    
                    setIsModalOpen(true)
                }}
            >
                <div className="text-xl">Send Money</div>
                <div 
                    className="text-2xl p-0.5" 
                >
                    <FaMoneyBillTransfer />
                </div>
                
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                name={name}
            ></Modal>
        </>
    )
}

function proper(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function UserSearchBar() {

    return (
        <div>
            <form action="">
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

const Modal = ({ isOpen, onClose, name }) => {
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
                    <form action="" className="flex flex-col justify-center items-center">
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
  