import { userSignupSchema, userSigninSchema } from "../validations/user.validation.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signUp = async (req, res) => {
    try {
        const user = userSignupSchema.parse(req.body);

        if (!user) {
            res.status(400).json({
                error: "Missing user data in request body", 
                ok: false, 
            });
            return;
        }

        const { username, firstName, lastName, password, email } = user;
        {const alreadyExistedUser = await User.findOne({ username });

        if (alreadyExistedUser) {
            res.status(409).json({
                error: "Username already taken",
                ok: false,
            });
            return;
        }}
        
        // encode password
        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            password: encryptedPassword,
            firstName,
            lastName,
            email
        });

        // Check if the user really created
        const createdUser = await User.findOne({ username }).select("-password -refreshToken -__v");

        if (!createdUser) {
            res.status(500).json({
                error: "Something went wrong while creating user",
                ok: false,
            });
            return;
        }
        res.status(201).json({
            message: "User registered successfully",
            user: createdUser,
            ok: true
        });
        return;
    } catch (error) {
        console.log(`[Error while signing up]\n${error}`);
        res.status(500).json({
            message: "Signed up failed due to some internal server error",
            error: JSON.stringify(error),
            ok: false,
        });
        return;
    }
};


export const signIn = async (req, res) => {
    try {
        const userR = userSigninSchema.parse(req.body);

        if (!userR) {
            res.status(400).json({
                error: "Missing user data in request body", 
                ok: false, 
            });
            return;
        }

        const { username, password } = userR;
        // find user in database
        const user = await User.findOne({ username });

        if (!user) {
            res.status(404).json({
                error: "User not found",
                ok: false,
            });
            return;
        }

        // match password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({
                error: "Invalid username or password",
                ok: false
            });
            return;
        }

        // generate access and refresh token 
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();
        
        user.refreshToken = refreshToken;
        await user.save();
        const options = {
            httpOnly: true,
            secure: true      
        };
        res.status(200)
          .cookie("refreshToken", refreshToken, options)
          .cookie("accessToken", accessToken, options)
          .json({
            message: "Login successful",
            refreshToken,
            accessToken
          });
        return;
    } catch (error) {
        console.log(`[Error while signing in]\n${error}`);
        res.status(500).json({
            message: error?.message || "Signed in failed due to some internal server error",
            error: JSON.stringify(error),
            ok: false,
        });
        return;
    }
}