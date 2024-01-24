import express from "express"
import { signup, login, update } from "../controllers/auth.controller.js"
const router = express.Router()
import { verifyToken } from "../middleware/jwt.js"

router.post("/", verifyToken, update)
router.post("/signup", signup)
router.post("/login", login)

export default router
