import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const PORT = process.env.PORT || 8000

const app = express()
dotenv.config()
mongoose.set("strictQuery", true)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log("Connected to mongodb")
  } catch (error) {
    console.log(error)
  }
}

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/v1/auth", authRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"

  return res.status(errorStatus).send(errorMessage)
})

app.listen(PORT, () => {
  connect()
  console.log(`Connected to mongodb ${PORT}`)
})
