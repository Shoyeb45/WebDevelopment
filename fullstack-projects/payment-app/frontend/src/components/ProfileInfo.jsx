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
        console.log(isEdit);
        
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
            console.log(editInfoChange);
            let response = await fetch(`${domain}/user`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json"
                }
            })
            response = await response.json();

            if (!response.ok) {
                setErrorMessage(response.message);
                return;
            }

            // everything went good, so update the accessToken
            localStorage.setItem("accessToken", response.accessToken);

            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error?.message || "Server side error while editing information")
        }
    };

    const outerDivStyle = "flex flex-col w-full";
    const inputStyle = "shadow-xs bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 focus:outline-none disabled:cursor-not-allowed";
    const labelStyle = "block mb-2  font-medium text-gray-900 w-full";

    return (
        <div>
            <div className="text-4xl text-center p-2 font-medium">
                Edit Basic Information
            </div>
            <form className="p-2 flex flex-col gap-3 sm:ms-14 sm:me-14 ms-2 me-2" noValidate onSubmit={editInfo}>
                <InputField
                    outerDivStyle={outerDivStyle}
                    inputStyle={inputStyle}
                    labelStyle={labelStyle}
                    placeholder={"Username"}
                    type={"text"}
                    id="username"
                    disabled={!isEdit}
                    Icon={"Username"}
                />

                <div className="sm:gap-8 gap-3 flex flex-wrap w-full sm:flex-nowrap sm:flex-row">
                    <InputField
                        outerDivStyle={outerDivStyle}
                        inputStyle={inputStyle}
                        labelStyle={labelStyle}
                        placeholder={"First Name"}
                        type={"text"}
                        id="firstName"
                        disabled={!isEdit}
                        Icon={"First Name"}
                    />

                    <InputField
                        outerDivStyle={outerDivStyle}
                        inputStyle={inputStyle}
                        labelStyle={labelStyle}
                        placeholder={"Last Name"}
                        type={"text"}
                        id="lastName"
                        disabled={!isEdit}
                        Icon={"Last Name"}
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
                    Icon={"Email"}
                />

                <div className="text-xl text-center font-medium">
                    {errorMessage}
                </div>
                <div className="flex justify-center">
                    <button 
                        className="p-2 text-xl flex px-5 text-center gap-3 justify-center items-center font-medium border-1 rounded-xl hover:cursor-pointer hover:bg-gray-800 hover:text-white"
                    >
                        {!isEdit? <Edit /> : "Submit"}
                    </button>

                </div>
            </form>
        </div>
    )
}

function Edit() {
    return (
        <>
            Edit Info
            <FaRegEdit />
        </>
    )
}