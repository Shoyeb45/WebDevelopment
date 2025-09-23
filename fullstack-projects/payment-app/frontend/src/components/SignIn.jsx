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
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4">
      <div className="text-3xl sm:text-5xl font-bold text-gray-800 mb-2 text-center">
        Welcome Back to
      </div>
      <div className="text-4xl sm:text-6xl font-bold bg-gradient-to-r text-purple-600 bg-clip-text  mb-8">
        EasyPay
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md border border-indigo-100">
        <SignInForm />
      </div>
    </div>
  );
};

const SignInForm = () => {
  const [_, setIsLoggedIn] = useRecoilState(isUserLoggedInAtom);
  const navigate = useNavigate();
  const outerDivStyle =
    "w-full flex items-center p-3 gap-3 border border-gray-200 rounded-xl bg-gray-50 hover:border-indigo-300 transition-all duration-300";
  const inputStyle =
    "placeholder:text-gray-500 focus:outline-none w-full bg-transparent text-gray-800 text-lg";
  const labelStyle = "text-gray-600 p-1";
  const errorRef = useRef();
  const buttonRef = useRef();

  async function userSignin(event) {
    try {
      event.preventDefault();
      buttonRef.current.innerHTML = "Signing In...";
      buttonRef.current.disabled = true;

      const form = new FormData(event.target);
      const userData = {
        username: form.get("username"),
        password: form.get("password"),
      };

      let response = await fetch(`${domain}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      response = await response.json();

      if (!response.ok) {
        errorRef.current.className =
          "text-center text-red-600 bg-red-50 p-3 rounded-lg mt-4 font-medium";
        errorRef.current.innerHTML = response.message;
        buttonRef.current.innerHTML = "Sign In";
        buttonRef.current.disabled = false;
        return;
      }

      // success
      localStorage.setItem("accessToken", response.accessToken);
      errorRef.current.className =
        "text-center text-green-600 bg-green-50 p-3 rounded-lg mt-4 font-medium";
      errorRef.current.innerHTML =
        "Successfully logged in! Redirecting to dashboard...";
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.log(error);
      errorRef.current.className =
        "text-center text-red-600 bg-red-50 p-3 rounded-lg mt-4 font-medium";
      errorRef.current.innerHTML =
        error?.message || "An error occurred. Please try again.";
      buttonRef.current.innerHTML = "Sign In";
      buttonRef.current.disabled = false;
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={userSignin}>
      <div className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Log In to Your Account
      </div>

      <InputField
        type="text"
        id="username"
        placeholder="Enter your username"
        outerDivStyle={outerDivStyle}
        inputStyle={inputStyle}
        labelStyle={labelStyle}
        Icon={<FaRegUser className="text-indigo-600 text-xl" />}
      />

      <InputField
        type="password"
        id="password"
        placeholder="Enter your password"
        outerDivStyle={outerDivStyle}
        inputStyle={inputStyle}
        labelStyle={labelStyle}
        Icon={<IoKeyOutline className="text-indigo-600 text-xl" />}
      />

      <div
        ref={errorRef}
        className="text-center min-h-12 items-center justify-center hidden"
      ></div>


      <div className="flex justify-center mt-2">
        <button
          type="submit"
          ref={buttonRef}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Sign In
        </button>
      </div>
<ToSignup navigate={navigate} />
    </form>
  );
};

const ToSignup = ({ navigate }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <div className="text-gray-600">New to EasyPay?</div>
      <button
        onClick={() => navigate("/signup")}
        className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300 underline-offset-2 hover:underline"
      >
        Create Account
      </button>
    </div>
  );
};
