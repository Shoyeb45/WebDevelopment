import { validationSchema } from "./../utils/dataValidation.js";
import { Admin } from "./../models/admin.model.js";
import { encryptPassword } from "../utils/passwordMethods.js";
import { genAccessToken, genRefreshToken } from "../utils/jwtMethods.js";



async function signup(request, response) {
    try {
        let adminUser = request.body;
        
        adminUser = validationSchema.parse(adminUser); 
        const existingAdminUser = await Admin.findOne({ username: adminUser.username });

        if (existingAdminUser) {
            response.status(400).json({
                ok: false,
                message: "Admin already exists: username is not unique, please change the username.",
            });
        }

        adminUser.password = await encryptPassword(adminUser.password);
        adminUser = await Admin.create( adminUser );

        const newAdminUser = await Admin.findById(adminUser._id).select(
            "-password -_id"
        );
        
        if (!newAdminUser) {
            response.status(500).json({
                ok: false,
                message: "Internal Server error while creating new admin",
            });
        }

        response.status(200).json({
            message: "Admin created successfully",
            admin: newAdminUser
        });
    } catch (error) {
        console.error(`[Error]\n${error}`);
        response.status(500).json({
            error
        });
    }
} 

/**
 * Admin function to signin 
 * @param {*} request request object
 * @param {*} response response object
 */
async function signin(request, response) {
    try {
        let adminUser = validationSchema.parse(request.body);

        // Find existing user
        const user = await Admin.findOne({username : adminUser.username });

        if (!user) {
            response.status(500).json({
                message: "Invalid username, admin does not exist.",
            });
        }
        // Check password
        const authPassword = await user.checkPassword(adminUser.password);

        if (!authPassword) {
            response.json(400).json({
                ok: true,
                message: "Invalid credentials: username and password does not match",
            });
        }

        // Generate access and refresh tokens
        let refreshToken = genRefreshToken({
            id: user._id,
            ...adminUser
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
            message: "Admin logged in successfully",
            user: {
                id: user._id,
                username: user.username
            },
            accessToken,
            refreshToken
          })        
    } catch (error) {
        console.error(`[Error]\n${error}`);
        response.status(500).json({ error });
    }
}
export {
    signup,
    signin
}