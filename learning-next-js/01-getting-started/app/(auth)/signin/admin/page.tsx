"use client"
import { SignIncompo } from "@/components/Signin";

export default function adminSignin() {
    return (<div>
        <div className="flex justify-center p-4 font-bold text-3xl">
            Admin Sign in page
        </div>
        
        <SignIncompo handler={function() {
            console.log("Button clicked with admin sign in page")
        }}/>
    </div>)
}
