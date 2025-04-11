import { genAccessToken, genRefreshToken } from "../utils/jwtMethods.js";
import { validationSchema } from "./../utils/dataValidation.js";
import { encryptPassword } from "../utils/passwordMethods.js";
import { User } from "../models/user.model.js";

async function signup(request, response) {
    try {
        let userObj = validationSchema.parse(request.body);

        let user = await User.findOne({ username: userObj.username });

        if (user) {
            response.status(400).json({
                ok: false,
                message: "User already exist: please choose other username."
            });
        }

        userObj.password = await encryptPassword(userObj.password);
        user = await User.create(userObj);

        const newUser = await User.findById(user._id).select(
            "-password -_id"
        );

        if (!newUser) {
            response.status(500).json({
                ok: false,
                message: "Internal server error whlie creating new user."
            });
        }

        response.status(200).json({
            ok: true,
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        console.error(`[Error in user signup]\n${error}`);
        response.status(500).json({
            message: error?.message | "Something unexpected happened",
            error
        });
    }
}

async function signin(request, response) {
    try {
        let inputUser = validationSchema.parse(request.body);

        // Find user in database
        const user = await User.findOne({ username: inputUser.username });

        if (!user) {
            response.status(500).json({
                ok: false,
                message: "Invalid username, user does not exist.",
            });
        }

        // Check password
        const authPassword = await user.checkPassword(inputUser.password);

        if (!authPassword) {
            response.status(400).json({
                ok: false,
                message: "Invalid credentials: username and password does not match",
            });
        }

        // Generate access and refresh tokens
        let refreshToken = genRefreshToken({
            id: user._id,
            ...inputUser
        }), accessToken = genAccessToken({
            id: user._id,
            username: user.username
        });

        const options = {
            httpOnly: true,
            secure: true      
        };

        response
          .status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json({
            ok: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username
            },
            accessToken,
            refreshToken
          });    
    } catch (error) {
        console.error(`[Error while user signing]\n${error}`);
        response.status(500).json({
            message: error?.message | "Something unexpected happened",
            error
        })
    }
}

export {
    signin,
    signup
};
