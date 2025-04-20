import { Router } from "express";
import { verifJWT } from "../middlewares/auth.middleware.js";
import { getBalance, performTransaction } from "../controllers/account.controller.js";

const router = Router();

router.route("/getbalance").get(verifJWT, getBalance);
router.route("/transaction").post(verifJWT, performTransaction);
export default router;