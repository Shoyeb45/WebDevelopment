import { getUser } from "../utils/helperFunctions.js"
import { InputField } from "./InputField.jsx";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { domain } from "../utils/helperFunctions.js";
import { useRecoilValue } from "recoil";
import { isUserLoggedInAtom } from "../stores/state.js";
import { useNavigate } from "react-router-dom";

export function ProfileInfo() {
    const user = getUser();

    const [isEdit, setIsEdit] = useState(false);
    const isUserLoggedIn = useRecoilValue(isUserLoggedInAtom);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/signin");
            return;
        }
    }, []);
    
    const [errorMessage, setErrorMessage] = useState("");    

    const editInfo = async (event) => {
        event.preventDefault();
        
        if (!isEdit) {
            setIsEdit(true);
            return;
        }
        
        try {
            const form = new FormData(event.target);
            const names = ["username", "firstName", "lastName", "email"];
            const editInfoChange = {};
            names.forEach((name) => {
                if (form.get(name) !== "") {
                    editInfoChange[name] = form.get(name);
                }
            });
            
            let response = await fetch(`${domain}/user`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editInfoChange)
            });
            
            response = await response.json();

            if (!response.ok) {
                setErrorMessage(response.message);
                return;
            }

            // everything went good, so update the accessToken
            localStorage.setItem("accessToken", response.accessToken);

            setErrorMessage("");
            setIsEdit(false);
        } catch (error) {
            setErrorMessage(error?.message || "Server side error while editing information");
        }
    };

    const outerDivStyle = "flex flex-col w-full";
    const inputStyle = `shadow-sm ${isEdit ? 'bg-white border-indigo-300 focus:ring-indigo-500' : 'bg-gray-50 border-gray-300 cursor-not-allowed'} text-gray-900 text-sm rounded-lg focus:outline-none focus:border-indigo-500 block w-full p-3 transition-all duration-300`;
    const labelStyle = "block mb-2 font-medium text-gray-700";

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="text-3xl sm:text-4xl text-center p-6 font-bold text-gray-800 mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-sm">
                Edit Profile Information
            </div>
            
            <form 
                className="p-6 bg-white rounded-2xl shadow-md border border-gray-200" 
                noValidate 
                onSubmit={editInfo}
            >
                <InputField
                    outerDivStyle={outerDivStyle}
                    inputStyle={inputStyle}
                    labelStyle={labelStyle}
                    placeholder={"Username"}
                    type={"text"}
                    id="username"
                    disabled={!isEdit}
                    label={"Username"}
                    value={user.username}
                />

                <div className="sm:gap-6 gap-4 flex flex-wrap w-full sm:flex-nowrap sm:flex-row my-6">
                    <InputField
                        outerDivStyle={outerDivStyle}
                        inputStyle={inputStyle}
                        labelStyle={labelStyle}
                        placeholder={"First Name"}
                        type={"text"}
                        id="firstName"
                        disabled={!isEdit}
                        label={"First Name"}
                        value={user.firstName}
                    />

                    <InputField
                        outerDivStyle={outerDivStyle}
                        inputStyle={inputStyle}
                        labelStyle={labelStyle}
                        placeholder={"Last Name"}
                        type={"text"}
                        id="lastName"
                        disabled={!isEdit}
                        label={"Last Name"}
                        value={user.lastName}
                    />
                </div>
                
                <InputField
                    outerDivStyle={outerDivStyle}
                    inputStyle={inputStyle}
                    labelStyle={labelStyle}
                    placeholder={"Email"}
                    type={"email"}
                    id="email"
                    disabled={!isEdit}
                    label={"Email"}
                    value={user.email}
                />

                {errorMessage && (
                    <div className="text-red-600 text-center font-medium py-3 px-4 bg-red-50 rounded-lg my-4 border border-red-200">
                        {errorMessage}
                    </div>
                )}
                
                <div className="flex justify-center mt-8">
                    <button 
                        type="submit"
                        className={`px-8 py-3 text-lg font-medium rounded-xl transition-all duration-300 flex items-center gap-3 justify-center 
                        ${isEdit 
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:scale-105' 
                            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105'}`}
                    >
                        {!isEdit ? (
                            <>
                                <FaRegEdit className="text-lg" />
                                Edit Profile
                            </>
                        ) : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    )
}