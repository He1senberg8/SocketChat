import express from 'express';
import { signup, login, logout ,updateProfile,check} from '../controllers/authController.js';
import verify from '../middleware/verify.js'

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

router.put("/update-profile",verify,updateProfile);
router.get("/check",verify,check)

export default router;