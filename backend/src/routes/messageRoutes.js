import express from "express";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/messageController.js";
import verify from "../middleware/verify.js";

const router = express.Router();

router.get("/users",verify, getUsersForSidebar)
router.get("/:id",verify, getMessages)


router.post("/send/:id",verify, sendMessage)
export default router
