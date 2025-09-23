import { MdOutlineMail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useRef } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { IoKeyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { domain } from "../utils/helperFunctions.js";
import { InputField } from "./InputField.jsx";

export const SignUp = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4">
      <div className="text-3xl sm:text-5xl font-bold text-gray-800 mb-2 text-center">
        Join
      </div>
      <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r text-purple-600 bg-clip-text mb-4">
        EasyPay
      </div>
      <div className="text-xl text-gray-600 text-center mb-12 max-w-2xl">
        Experience the new digital age of online payments with our secure, fast, and user-friendly platform
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md border border-indigo-100">
        <FormSignUp />
      </div>
    </div>
  );
};

const FormSignUp = () => {
    const errorRef = useRef();
    const buttonRef = useRef();
    const navigate = useNavigate();

    const outerDivStyle = "w-full flex items-center p-3 gap-3 border border-gray-200 rounded-xl bg-gray-50 hover:border-indigo-300 transition-all duration-300";
    const inputStyle = "placeholder:text-gray-500 focus:outline-none w-full bg-transparent text-gray-800 text-lg";
    const labelStyle = "text-gray-600 p-1";

    async function registerUSer(event) {
        try {
            event.preventDefault();
            buttonRef.current.innerHTML = "Creating Account...";
            buttonRef.current.disabled = true;
            
            const form = new FormData(event.target);
            const cnfrmPassword = form.get("cnfrmPassword");

            const userData = {
                username: form.get("username"),
                firstName: form.get("firstName"),
                lastName: form.get("lastName"),
                email: form.get("email"),
                password: form.get("password"),
            };
            
            if (cnfrmPassword !== userData.password) {
                errorRef.current.className = "text-center text-red-600 bg-red-50 p-3 rounded-lg font-medium flex";
                errorRef.current.innerHTML = "Passwords do not match. Please ensure both passwords are identical.";
                buttonRef.current.innerHTML = "Sign Up";
                buttonRef.current.disabled = false;
                return;
            }
            
            let response = await fetch(`${domain}/user/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            });
            
            response = await response.json();
            if (!response.ok) {
                errorRef.current.className = "text-center text-red-600 bg-red-50 p-3 rounded-lg font-medium";
                errorRef.current.innerHTML = response?.message || "Registration failed. Please try again.";
                buttonRef.current.innerHTML = "Sign Up";
                buttonRef.current.disabled = false;
                return;   
            }
            
            errorRef.current.className = "text-center text-green-600 bg-green-50 p-3 rounded-lg font-medium";
            errorRef.current.innerHTML = "Successfully registered! Redirecting to Sign In...";
            
            setTimeout(() => {
                navigate("/signin");
            }, 2000);
        } catch (error) {
            console.log(error);
            errorRef.current.className = "text-center text-red-600 bg-red-50 p-3 rounded-lg font-medium";
            errorRef.current.innerHTML = error?.message || "An unexpected error occurred. Please try again.";
            buttonRef.current.innerHTML = "Sign Up";
            buttonRef.current.disabled = false;
        }
    } 
    
    return (
        <form className="flex flex-col gap-6" onSubmit={registerUSer}>
            <InputField
                type="email"
                outerDivStyle={outerDivStyle}
                labelStyle={labelStyle}
                inputStyle={inputStyle}
                id="email"
                placeholder="Enter your email address"
                Icon={<MdOutlineMail className="text-indigo-600 text-xl" />}
                pattern={"[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,}$"}
            />
            
            <InputField
                type="text"
                outerDivStyle={outerDivStyle}
                labelStyle={labelStyle}
                inputStyle={inputStyle}
                id="username"
                placeholder="Choose a username"
                Icon={<FaRegUser className="text-indigo-600 text-xl" />}
            />
       
            <div className="gap-4 flex flex-wrap sm:flex-nowrap">
                <InputField
                    type="text"
                    outerDivStyle={outerDivStyle}
                    labelStyle={labelStyle}
                    inputStyle={inputStyle}
                    id="firstName"
                    placeholder="First Name"
                    Icon={<RiUserFollowLine className="text-indigo-600 text-xl" />}
                />
                <InputField
                    type="text"
                    outerDivStyle={outerDivStyle}
                    labelStyle={labelStyle}
                    inputStyle={inputStyle}
                    id="lastName"
                    placeholder="Last Name"
                    Icon={<RiUserFollowLine className="text-indigo-600 text-xl" />}
                />
            </div>

            <InputField
                type="password"
                outerDivStyle={outerDivStyle}
                labelStyle={labelStyle}
                inputStyle={inputStyle}
                id="password"
                placeholder="Create a password"
                Icon={<IoKeyOutline className="text-indigo-600 text-xl" />}
            />
            
            <InputField
                type="password"
                outerDivStyle={outerDivStyle}
                labelStyle={labelStyle}
                inputStyle={inputStyle}
                id="cnfrmPassword"
                placeholder="Confirm password"
                Icon={<IoKeyOutline className="text-indigo-600 text-xl" />}
            />

            <div ref={errorRef} className="min-h-12 hidden items-center justify-center">
            </div>
            
            
            <div className="flex justify-center mt-2">
                <button 
                    type="submit"
                    ref={buttonRef}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    Create Account
                </button>
            </div>
            <ToSignin />
        </form>
    )
}

const ToSignin = () => {
    const navigate = useNavigate();
  
    return (
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="text-gray-600">
          Already have an account?
        </div>
        <button 
          onClick={() => navigate("/signin")}
          className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300 underline-offset-2 hover:underline"
        >
          Sign In
        </button>
      </div>
    )
}