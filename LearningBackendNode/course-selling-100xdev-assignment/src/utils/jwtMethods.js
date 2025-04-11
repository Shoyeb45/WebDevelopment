import jwt from "jsonwebtoken";

export function genAccessToken(obj) {
    try {
        const signature = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "7d"
        });
        console.log(`[INFO] jwt access token: ${signature}`);
        return signature;
    } catch (error) {
        console.error(`[Error while generating access tokens]\n${error}`);
        return null;
    }
}

export function genRefreshToken(obj) {
    try {
        const signature = jwt.sign(obj, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "365d"
        });
        console.log(`[INFO] jwt refresh token: ${signature}`);
        return signature;
    } catch (error) {
        console.error(`[Error while generating access tokens]\n${error}`);
        return null;
    }
}