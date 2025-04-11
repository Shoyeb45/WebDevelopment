import { Router } from "express";
import { signin, signup, createCourse, getAllCourse } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middlware.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/courses").post(verifyJWT, createCourse);
router.route("/courses").get(verifyJWT, getAllCourse);

export default router;