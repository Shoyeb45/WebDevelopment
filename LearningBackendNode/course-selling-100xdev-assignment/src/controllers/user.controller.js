import { genAccessToken, genRefreshToken } from "../utils/jwtMethods.js";
import { validationSchema } from "./../utils/dataValidation.js";
import { encryptPassword } from "../utils/passwordMethods.js";
import { User } from "../models/user.model.js";
import { Course } from "../models/course.model.js";
import { any } from "zod";

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
            ...inputUser,
            role: "user",
        }), accessToken = genAccessToken({
            id: user._id,
            username: user.username,
            role: "user",
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

async function getAllTheCourses(request, response) {
    try {
        const allTheCourses = await Course.find({});

        if (!allTheCourses) {
            return response.status(500).json({
                ok: false,
                message: "Internal server error while getting all the courses."
            });
        }

        return response.status(201).json({
            message: "All the available courses",
            ok: true,
            courses: allTheCourses
        });
    } catch (error) {
        console.error(`[Error while getting all the available courses]\n${error}`);
        return response.status(500).json({
            ok: false,
            message: error?.message || "Unexpcted error occurred while getting all the available courses.",
        });      
    }
}

async function purchaseCourse(request, response) {
    try {
        const user = request.user;
        const courseId = request.params.courseId;
        const course = await Course.findById(courseId);

        if (!course) {
            return response.status(500).json({
                ok: false,
                message: "Invalid course id or course doesn't exist.",
            });
        }


        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                $addToSet: {
                    courses: courseId
                }
            },
            {
                new: true,
            }
        ).select("-password -refreshToken");

        return response.status(201).json({
            ok: true,
            message: "Course purchased successfully",
            user: updatedUser,
            purchasedCourse : course
        });
    } catch (error) {
        console.error(`[Error while purchasing the course]\n${error}`);
        return response.status(500).json({
            ok: false,
            message: error?.message || "Unexpected error while purchasing the course",
            error
        })
    }
}

async function getAllpurchasedCourses(request, response) {
    try {
        const user = await User.findById(request.user._id);
        
        if (!user) {
            return response.status(500).json({
                ok: false,
                message:"Unexpected error while fetching user from the database",
            });
        }

        const allCourseList = user.courses;
        
        let allCourse = [];

        for (let i = 0; i < allCourseList.length; i++) {
            const courseId = allCourseList[i];
            const course = await Course.findById(courseId).select("-mentor -createdAt -updatedAt -__v");
            if (!course) {
                console.error(`[Error while getting the course from db] id : ${courseId}`);
            }
            
            allCourse.push(course);
            console.log(course);
        }
            

        console.log(allCourse);
        
        return response.status(201).json({
            ok: true,
            message: "Successfully got all the purchased courses",
            courses: allCourse
        });
    } catch (error) {
        console.error(`[Error while getting all the purchased courses]\n${error}`);
        return response.status(500).json({
            ok: false,
            message: error?.message || "Unexpected error while getting all the purchased courses",
            error
        })
        
    }
}


export {
    signin,
    signup,
    getAllTheCourses,
    purchaseCourse,
    getAllpurchasedCourses
};
