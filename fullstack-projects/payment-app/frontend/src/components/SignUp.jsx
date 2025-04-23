import { MdOutlineMail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useRef } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { IoKeyOutline, IoMailOpen } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { domain } from "../utils/helperFunctions.js";
import { InputField } from "./InputField.jsx";

export const SignUp = () => {
  return (
    <div className="flex flex-col sm:p-12  items-center">
        <div className=" sm:text-3xl  flex flex-col gap-2 sm:items-center items-start  px-1 py-3 sm:me-0 me-2">
            <div>
                EasyPay: Get started with new digital 
            </div>
            <div>
                age of online payment
            </div>

        </div>
        <div className="flex items-center mt-3">
            <FormSignUp />
        </div>
    </div>
  );
};



const FormSignUp = () => {

    const errorRef = useRef();
    const buttonRef = useRef();

    const outerDivStyle = "border-b-1 w-full border-gray-500 flex items-center p-1 gap-3";
    const inputStyle = "placeholder:text-gray-600 focus:outline-none w-full";
    const labelStyle = "text-xl text-center text-gray-600 p-1";


    async function registerUSer(event) {
        buttonRef.current.innerHTML = "Signing Up...";
        try {
            event.preventDefault();
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
                errorRef.current.className = "text-center text-red-500";
                errorRef.current.innerHTML = "Passwords do not match, please match both the passwords";
                buttonRef.current.innerHTMML = "Sign Up";
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
                buttonRef.current.innerHTMML = "Sign Up";
                errorRef.current.className = "text-center text-red-500";
                errorRef.current.innerHTML = response?.message;
                return;   
            }
            // console.log(response);
            errorRef.current.className = "text-center text-green-500";
            errorRef.current.innerHTML = "Successfully Registerd, click on the Sign In below";
            buttonRef.current.innerHTMML = "Sign Up";
        } catch (error) {
            console.log("error");
            
            console.log(error.message);
            buttonRef.current.innerHTML = "Sign Up";
            errorRef.current.innerHTML = error?.message;
            return;
        }
    } 
    return (
        <form className="flex flex-col w-full gap-8  " onSubmit={registerUSer}>

            <InputField
                type="email"
                outerDivStyle={outerDivStyle}
                labelStyle={labelStyle}
                inputStyle={inputStyle}
                id="email"
                placeholder="Email Address"
                Icon={<MdOutlineMail />}
                pattern={"[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,}$"}
            />
            <InputField
                type="text"
                outerDivStyle={outerDivStyle}
                labelStyle={labelStyle}
                inputStyle={inputStyle}
                id="username"
                placeholder="Username"
                Icon={<FaRegUser />}
            />
       
            <div className="gap-8 flex flex-wrap sm:flex-nowrap sm:flex-row">
                <InputField
                    type="text"
                    outerDivStyle={outerDivStyle}
                    labelStyle={labelStyle}
                    inputStyle={inputStyle}
                    id="firstName"
                    placeholder="First Name"
                    Icon={<RiUserFollowLine />}
                />
                <InputField
                    type="text"
                    outerDivStyle={outerDivStyle}
                    labelStyle={labelStyle}
                    inputStyle={inputStyle}
                    id="lastName"
                    placeholder="Last Name"
                    Icon={<RiUserFollowLine />}
                />
            </div>

            <InputField
                type="password"
                outerDivStyle={outerDivStyle}
                labelStyle={labelStyle}
                inputStyle={inputStyle}
                id="password"
                placeholder="Password"
                Icon={<RiUserFollowLine />}
            />
            <InputField
                type="password"
                outerDivStyle={outerDivStyle}
                labelStyle={labelStyle}
                inputStyle={inputStyle}
                id="cnfrmPassword"
                placeholder="Confirm Password"
                Icon={<RiUserFollowLine />}
            />

            <div className=" text-red-600 text-center" ref={errorRef}>
                
            </div>
            <ToSignin />
            <div className="flex justify-center">
                <button 
                    type="submit" 
                    className="text-xl border-2 p-2 rounded-2xl px-6 hover:cursor-pointer"
                    ref={buttonRef}
                >
                    Sign Up
                </button>

            </div>
        </form>
    )
}




const ToSignin = () => {
    const navigate = useNavigate();
  
  
    return (
      <div className="flex items-center justify-center gap-2">
        <div className="">
          Already EasyPayer?
        </div>
        <button 
          onClick={() => navigate("/signin")}
          className={`text-blue-700 underline font-bold hover:cursor-pointer`}
        >
          Sign in
        </button>
      </div>
  
    )
  }