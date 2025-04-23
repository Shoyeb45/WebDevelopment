import { useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { domain } from "../utils/helperFunctions.js";
import { isUserLoggedInAtom } from "../stores/state.js";
import { InputField } from "./InputField.jsx";

export const SignIn = () => {
  return (
    <div className="flex flex-col items-center sm:p-12 p-6">
      <div className="text-2xl sm:text-4xl sm:p-4 flex flex-col">Log In to make payment</div>
      <div className="p-3 mt-3">
        <SignInForm />
      </div>
    </div>
  );
 
};

const SignInForm = () => {
  const [_, setIsLoggedIn] = useRecoilState(isUserLoggedInAtom);
  const navigate = useNavigate();
  const outerDivStyle = "border-b-1 w-full border-gray-500 flex items-center p-1 gap-3";
  const inputStyle = "placeholder:text-gray-600 focus:outline-none w-full";
  const labelStyle = "text-xl text-center text-gray-600 p-1";
  const errorRef = useRef();
  const buttonRef = useRef();
  async function userSignin(event) {
    try {
      event.preventDefault();
      buttonRef.current.innerHTML = "Signing In....";
      const form = new FormData(event.target);
      const userData = {
        username: form.get("username"),
        password: form.get("password")
      };
      
      let response = await fetch(`${domain}/user/signin`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
      });

      response = await response.json();

      if (!response.ok) {
        errorRef.current.className = "text-center text-red-500";
        errorRef.current.innerHTML = response.message;
        buttonRef.current.innerHTML = "Sign In";
        return;
      }
      
      // success
      // set accessToken
      localStorage.setItem("accessToken", response.accessToken);
      errorRef.current.className = "text-center text-green-500";
      errorRef.current.innerHTML = "Successfully logged in, redirecting to dashboard...";
      setIsLoggedIn(true);
      navigate("/dashboard");
      buttonRef.current.innerHTML = "Sign In";
    } catch (error) {
      console.log(error);
      errorRef.current.className = "text-center text-red-500";
      errorRef.current.innerHTML = error?.message;
      buttonRef.current.innerHTML = "Sign In";
      return;
    }
  }

  return (
    <form 
      className="flex flex-col p-3 gap-6 sm:w-90 "
      onSubmit={userSignin}
    >

     

      <InputField 
        type="text"
        id="username"
        placeholder={"Username"}
        outerDivStyle={outerDivStyle}
        inputStyle={inputStyle}
        labelStyle={labelStyle}
        Icon={<FaRegUser />}
      />

      <InputField 
        type="password"
        id="password"
        placeholder={"Password"}
        outerDivStyle={outerDivStyle}
        inputStyle={inputStyle}
        labelStyle={labelStyle}
        Icon={<IoKeyOutline />}
      />

      <div ref={errorRef} className="text-center">
      </div>
      <ToSignup navigate={navigate}/>
      <div className="flex justify-center">
        <button 
          className="border-2 p-2 rounded-2xl px-6 hover:cursor-pointer"
          ref={buttonRef}
        >
          Log In
        </button>
      </div>
    </form>
  );
};


const ToSignup = ({ navigate }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="">
        New to EasyPay?
      </div>
      <button 
        onClick={() => navigate("/signup")}
        className={`text-blue-700 underline font-bold hover:cursor-pointer`}
      >
        Sign Up
      </button>
    </div>
  )
}


