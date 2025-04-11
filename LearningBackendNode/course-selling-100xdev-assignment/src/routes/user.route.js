import { Router } from "express"
import { signup, signin, getAllTheCourses, purchaseCourse, getAllpurchasedCourses } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlware.js";
const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/courses").get(verifyJWT, getAllTheCourses);
router.route("/courses/:courseId").post(verifyJWT, purchaseCourse);
router.route("/purchasedCourses").get(verifyJWT, getAllpurchasedCourses);


export default router;