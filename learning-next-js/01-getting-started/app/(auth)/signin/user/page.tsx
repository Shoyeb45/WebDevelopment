"use client"
import { SignIncompo } from "@/components/Signin"

export default function Signin() {
    function handler() {
        console.log("Clicked user sign in page");
        
    }
    return <div>
        <div>User Sign In Page</div>
        <SignIncompo handler={handler}/>
    </div>
}

