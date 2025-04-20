import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifJWT = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            res.status(403).json({
                error: "Unauthorized access",
                ok: false
            });
            return;
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        if (!decodedToken) {
            res.status(403).json({
                error: "Unauthorized access",
                ok: false,
            });
            return;
        }
        
        const user = await User.findById(decodedToken._id);
        
        if (!user) {
            res.status(403).json({
                error: "Invalid access token",
                ok: false
            });
            return;
        }
        req.user = user;
            
        next();
    } catch (error) {
        console.error(`[Error while verifying tokens]\n${error}`);
        res.status(500).json({
            error: error?.message || "Unexpected server error while verifying jwt",
            error
        });
        return;
    }
};