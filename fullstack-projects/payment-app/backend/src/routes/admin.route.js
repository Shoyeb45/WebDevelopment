import { Router } from 'express';
import { addBalance } from '../controllers/admin.controller.js';

const router = Router();

router.route("/updatebalance").post(addBalance);

export default router;