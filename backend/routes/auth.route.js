import express from "express"
import { signup, login, update, bulk } from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()
router.post("/", verifyToken, update)
router.post("/signup", signup)
router.post("/login", login)
router.get("/bulk", bulk)

export default router
