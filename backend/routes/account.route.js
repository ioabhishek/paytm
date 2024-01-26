import express from "express"
import { balance, transfer } from "../controllers/account.controller.js"
import { verifyToken } from "../middleware/jwt.js"
const router = express.Router()

router.get("/balance", verifyToken, balance)
router.post("/transfer", verifyToken, transfer)

export default router
