import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import createError from "../utils/createError.js"
import { signupBody, loginBody, updateBody } from "../validator/validator.js"

export const signup = async (req, res, next) => {
  try {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
      return res.status(411).json({
        message: "Incorrect Input",
      })
    }

    const checkUser = await User.findOne({ username: req.body.username })
    if (checkUser) return next(createError(411, "Email already taken"))

    const hash = bcrypt.hashSync(req.body.password, 5)

    const newUser = new User({
      ...req.body,
      password: hash,
    })

    const user = await newUser.save()

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    )

    res.status(200).send({ message: "User created successfully", token: token })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { success } = loginBody.safeParse(req.body)
    if (!success) return next(createError(411, "Invalid Inputs"))

    const user = await User.findOne({
      username: req.body.username,
    })
    if (!user) return next(createError(400, "User not found"))

    const isCorrect = bcrypt.compareSync(req.body.password, user.password)
    if (!isCorrect) return next(createError(400, "Wrong username or password"))

    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET
      )

      return res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .json({ token: token })
    }

    return next(createError(411, "Invalid Inputs"))
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const { success } = updateBody.safeParse(req.body)
    if (!success)
      return next(createError(400, "Error while updating information"))

    const hash = bcrypt.hashSync(req.body.password, 5)
    const bodyy = { ...req.body, password: hash }

    await User.findByIdAndUpdate(req.userId, bodyy)

    res.status(200).send({ message: "Updated successfully" })
  } catch (error) {
    next(error)
  }
}

export const bulk = async (req, res, next) => {
  const filter = req.query.filter || ""
  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    })
    res.status(200).send({
      user: users.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    })
  } catch (error) {
    next(error)
  }
}
