import bcrypt from "bcryptjs";

export async function encryptPassword(password) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(`[INFO] Encrypted Password : ${encryptedPassword}`);
    return encryptedPassword;
}

export async function isPasswordCorrect(userPassword, originalPassword) {
    try {
        return await bcrypt.compare(userPassword, originalPassword);
    } catch (error) {
        console.error(`[Error While checking password] \n${error}`);
        return null;
    }
}