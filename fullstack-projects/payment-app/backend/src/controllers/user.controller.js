import { userSignupSchema, userSigninSchema, userInfoSchema, userPasswordSchema } from "../validations/user.validation.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { Account } from "../models/account.model.js";
import { ZodError } from "zod";

export const signUp = async (req, res) => {
    try {
        const user = userSignupSchema.parse(req.body);

        if (!user) {
            res.status(400).json({
                message: "Missing user data in request body, please try once more", 
                ok: false, 
            });
            return;
        }

        const { username, firstName, lastName, password, email } = user;
        {const alreadyExistedUser = await User.findOne({ username });

        if (alreadyExistedUser) {
            res.status(409).json({
                message: "Username already taken please choose another username",
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
                message: "Something went wrong in database while creating user please try once more",
                ok: false,
            });
            return;
        }

        // create account
        await Account.create({
            user: createdUser._id,
            balance: 0
        });

        res.status(201).json({
            message: "User registered successfully",
            user: createdUser,
            ok: true
        });
        return;
    } catch (error) {
        if (error instanceof ZodError) {
            // Extract error details nicely
            const message = error.errors
              .map(e => `${e.path.join('.')} - ${e.message}`)
              .join(', ');

            return res.status(400).json({
                message: `Validation failed: ${message}`,
                ok: false,
            });
        }
        console.error(`[Error while signing up]\n${error}`);
        res.status(500).json({
            message: error?.message || "Signed up failed due to some internal server error",
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
                message: "Missing user data in request body", 
                ok: false, 
            });
            return;
        }

        const { username, password } = userR;
        // find user in database
        const user = await User.findOne({ username });

        if (!user) {
            res.status(404).json({
                message: "User not found",
                ok: false,
            });
            return;
        }

        // match password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({
                message: "Invalid username or password",
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
            secure: true,
            sameSite: "None",
            path: "/",   
        };
        res.status(200)
          .cookie("refreshToken", refreshToken, options)
          .cookie("accessToken", accessToken, options)
          .json({
            message: "Sign in successful",
            refreshToken,
            accessToken,
            ok: true
          });
        return;
    } catch (error) {
        if (error instanceof ZodError) {
            // Extract error details nicely
            const message = error.errors
              .map(e => `${e.path.join('.')} - ${e.message}`)
              .join(', ');

            return res.status(400).json({
                message: `Validation failed: ${message}`,
                ok: false,
            });
        }

        console.error(`[Error while signing in]\n${error}`);
        res.status(500).json({
            message: error?.message || "Signed in failed due to some internal server error",
            error: JSON.stringify(error),
            ok: false,
        });
        return;
    }
}


export const changeDetails = async (req, res) => {
    try {
        
        const userInfo = userInfoSchema.parse(req.body);
        const updatedUser = await User.updateOne({ _id: req.user._id }, { 
            $set: userInfo
        });
        
        if (!updatedUser) {
            res.status(500).json({
                error: "Unexpected error while updating information",
                ok: false
            });
            return;
        }

        res.status(200).json({
            message: "User information update successfully",
            ok: true
        });
        return;
    } catch (error) {
        console.error(`[Error while changing user details]\n${error}`);
        res.status(500).json({
            message: error?.message || "Changing user details failed due to some internal server error",
            error: JSON.stringify(error),
            ok: false,
        });
        return;
    }
};

export const changePassword = async (req, res) => {
    try {
        const passwordInfo = userPasswordSchema.parse(req.body);

        if (!passwordInfo) {
            res.status(500).json({
                error: "Invalid username or password",
                ok: false
            });
            return;
        }

        // check if old password is matching with new one
        {const isCorrectPassword = await bcrypt.compare(passwordInfo.oldPassword, req.user.password)
            if (!isCorrectPassword) {
                res.status(401).json({
                    error: "Old Password didn't match",
                    ok: false
                });
            }
        }

        // encrypt new password
        const encryptedPassword = await bcrypt.hash(passwordInfo.newPassword, 10);

        const update = await User.updateOne({ _id: req.user._id}, {
            $set: {
                password: encryptedPassword
            }
        });

        if (!update) {
            res.status(500).json({
                error: "Unexpected error while updating password",
                ok: false
            });
            return;
        }

        res.status(200).json({
            message: "Password successfully changed",
            ok: true
        });
        return;

    } catch (error) {
        console.error(`[Error while changing user password]\n${error}`);
        res.status(500).json({
            message: error?.message || "Changing user password failed due to some internal server error",
            error: JSON.stringify(error),
            ok: false,
        });
        return;
        
    }
}

export const getUsers = async (req, res) => {
    try {
        const filter = req.query.filter;

        if (!filter) {
            // give all users
            const users = await User.find({})
              .select("username firstName lastName _id");

            const usersWithBalance = await getUsersWithBalance(users)
            res.status(201).json({
                users: usersWithBalance,
                ok: true,
                message: "All users retrieved successfully"
            });
            return;
        }

        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: 'i' } },
                { lastName: { $regex: filter, $options: 'i' } },
            ]
        }).select("username firstName lastName _id");

        const usersWithBalance = await getUsersWithBalance(users);

        res.status(201).json({
            messge: `Found ${users.length} users`,
            users: usersWithBalance,
            ok: true
        });
    } catch (error) {
        console.error(`[Error while getting users]\n${error}`);
        res.status(500).json({
            message: error?.message || "Getting users failed due to some internal server error",
            error: JSON.stringify(error),
            ok: false,
        });
        return;
    }
}

async function getUsersWithBalance(users) {
    return await Promise.all(
        users.map(async (user) => {
            const account = await Account.findOne({ user: user._id });
            return {
                ...user.toObject(),
                balance: account?.balance || 0
            };
        })
    );
}
