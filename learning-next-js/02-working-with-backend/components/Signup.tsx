"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import { SignUpType } from "@/types/authentication.type";

export function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function signup() {
        try {
            const data : SignUpType = {
                name, email, password
            };
            const result = await axios.post("http://localhost:3000/api/user/signup", data)

            if (!result.status) {
                alert("sign up error")
                return;
            }
            alert("Sign up successfull");
            router.push("/auth/signin")
        } catch (error) {
            console.log(error);
        }
    } 

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Sign up
                        </div>
                    </div>

                    <div className="pt-2">
                        <LabelledInput onChange={(e) => {
                            setName(e.target.value);
                        }} label="Name" placeholder="harkirat@gmail.com" />

                        <LabelledInput onChange={(e) => {
                            setEmail(e.target.value);
                        }} label="email" placeholder="harkirat@gmail.com" />

                        <LabelledInput onChange={(e) => {
                            setPassword(e.target.value)
                        }} label="Password" type={"password"} placeholder="123456" />
                        <button onClick={signup} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Sign Up
                        </button>
                    </div>
                </div>
            </a>
        </div>
    </div>

}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: ChangeEventHandler<HTMLInputElement>
}
