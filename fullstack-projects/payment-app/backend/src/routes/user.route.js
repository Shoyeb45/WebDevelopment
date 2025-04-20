import { Router } from "express";
import { signIn, signUp, changeDetails, changePassword, getUsers } from "../controllers/user.controller.js";
import { verifJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/").put(verifJWT, changeDetails);
router.route("/changepassword").put(verifJWT, changePassword);
router.route("/users").get(verifJWT, getUsers);

export default router;
