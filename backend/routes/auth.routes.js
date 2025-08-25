import express from "express";
import { checkAuth, login, logout } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router()

router.post("/login",login)
router.get("/check",verifyToken,checkAuth)
router.post("/logout",logout)

export default router