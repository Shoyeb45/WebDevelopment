import axios from "axios";
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

async function submitOtp(otp: string, newPassword: string, token: string) {
  try {
    const data = {
      otp: otp, newPassword: newPassword, email: "shoyebff45@gmail.com", token
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3333/reset-password',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    const res = await axios.request(config)
    // console.log(res.data);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      
    }
    
  }
}

export default function App() {
  const [ otp, setOtp ] = useState<string>("");
  const [ newPassword, setNewPassword ] = useState<string>("");
  const [ token, setToken ] = useState<string>("");

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100vw",
      justifyContent: "center",
      alignItems: "center",
      gap: "12px"
    }}>
      <input type="text" placeholder="Enter OTP" onChange={(e) => {
        setOtp(e.target.value);
      }}/>
      <input type="password" placeholder="Enter new password" onChange={(e) => {
        setNewPassword(e.target.value);
      }}/>

      <Turnstile onSuccess={(token) => {
        setToken(token);
      }} siteKey="0x4AAAAAABmTH7BqNo6OW4Fo"/>
      <button onClick={() => {
        submitOtp(otp, newPassword, token)
        .then((data) => {
          console.log(data);
        });
      }}>Submit</button>
    </div>
  )
}