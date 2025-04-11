import jwt from "jsonwebtoken";
import { User } from "./../models/user.model.js";
import { Admin } from "./../models/admin.model.js";

const verifyJWT = async (request, response, next) => {
    try {
        const accessToken = request.header("Authorization")?.replace("Bearer ", "");
        
        if (!accessToken) {
            response.status(401).json({
                ok: false,
                message: "Unauthorised access",
            });
        }

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        
        if (!decodedToken) {
            response.status(401).json({
                ok: false,
                message: "Invalid access token",
            });
        }
        
        let user;
        if (decodedToken.role === "admin") {
            user = await Admin.findById(decodedToken.id ).select(
                "-password -refreshToken"
            ); 
        }
        else if (decodedToken.role === "user") {
            user = await User.findById(decodedToken.id).select(
                "-password -refreshToken"
            ); 
        }
        else {
            return response.status(401).json({
                ok: false,
                message: "Invalid role of the accessing user"
            });
        }
        
        if (!user) {
            return response.status(400).json({
                ok: false,
                message: "User is not present",
            });
        }
        // Assign user key in request object
        request.user = user;
        next();
    } catch (error) {
        console.error(`[Error While verifying jwt]\n${error}`);
        response.status(500).json({
            ok: false,
            message: error?.message || "Something Unexpected happened while verifying jwt",
            error: error
        })
    }
}


export {
    verifyJWT
};