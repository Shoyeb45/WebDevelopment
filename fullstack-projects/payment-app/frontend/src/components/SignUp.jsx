import { MdOutlineMail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useRef } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { IoKeyOutline, IoMailOpen } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { domain } from "../utils/helperFunctions.js";

export const SignUp = () => {
  return (
    <div className="flex flex-col sm:p-12 p-4 items-center">
        <div className=" sm:text-3xl  flex flex-col gap-2 sm:items-center items-start  px-1 py-3 sm:me-0 me-2">
            <div>
                EasyPay: Get started with new digital 
            </div>
            <div>
                age of online payment
            </div>

        </div>
        <div className="p-3 mt-3">
            <FormSignUp />
        </div>
    </div>
  );
};



const FormSignUp = () => {

    const errorRef = useRef();

    const outerDivStyle = "border-b-1 w-full border-gray-500 flex items-center p-1 gap-3";
    const inputStyle = "placeholder:text-gray-600 focus:outline-none w-full";
    const labelStyle = "text-xl text-center text-gray-600 p-1";


    async function registerUSer(event) {
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
                errorRef.current.innerHTML = "Passwords do not match, please match both the passwords";
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
                errorRef.current.className = "text-center text-red-500";
                errorRef.current.innerHTML = response?.message;
                return;   
            }
            // console.log(response);
            errorRef.current.className = "text-center text-green-500";
            errorRef.current.innerHTML = "Successfully Registerd, click on the Sign In below";
        } catch (error) {
            console.log("error");
            
            console.log(error.message);
            errorRef.current.innerHTML = error?.message;
            return;
        }
    } 
    return (
        <form className="flex flex-col gap-8 w-full " onSubmit={registerUSer}>

            <div className={outerDivStyle}>
                <label htmlFor="email" className={labelStyle}><MdOutlineMail /></label>

                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    placeholder="Email Address" 
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className={inputStyle} 
                    required
                />
            </div>

            <div className={outerDivStyle}>
                <label htmlFor="username" className={labelStyle}><FaRegUser /></label>
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    placeholder="Username" 
                    className={inputStyle} 
                    required
                />

            </div>

            <div className="gap-8 flex flex-wrap sm:flex-nowrap sm:flex-row">
                <div className={outerDivStyle}>
                    <label htmlFor="firstName" className={labelStyle}><RiUserFollowLine /></label>
                    <input 
                        type="text" 
                        name="firstName" 
                        id="firstName" 
                        placeholder="First Name" 
                        className={inputStyle} 
                        required
                    />
                </div>

                <div className={outerDivStyle}>
                    <label htmlFor="lastName" className={labelStyle}><RiUserFollowLine /></label>
                    <input 
                        type="text" 
                        name="lastName" 
                        id="lastName" 
                        placeholder="Last Name" 
                        className={inputStyle} 
                        required
                    />
                </div>
            </div>

            <div className={outerDivStyle}>
                <label htmlFor="password" className={labelStyle}><IoKeyOutline /></label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password" 
                    className={inputStyle} 
                    required
                />

            </div>

            <div className={outerDivStyle}>
                <label htmlFor="cnfrmPassword" className={labelStyle}><IoKeyOutline /></label>
                <input 
                    type="password" 
                    id="cnfrmPassword" 
                    name="cnfrmPassword" 
                    placeholder="Confirm Password"
                    className={inputStyle} 
                    required
                />
            </div>

            <div className=" text-red-600 text-center" ref={errorRef}>
                
            </div>
            <ToSignin />
            <div className="flex justify-center">
                <button 
                    type="submit" 
                    className="text-xl border-2 p-2 rounded-2xl px-6"
                >
                    Submit
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
          className={`text-blue-700 underline font-bold`}
        >
          Sign in
        </button>
      </div>
  
    )
  }