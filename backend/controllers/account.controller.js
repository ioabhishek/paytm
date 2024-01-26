import mongoose from "mongoose"
import Account from "../models/account.model.js"
import createError from "../utils/createError.js"

export const balance = async (req, res, next) => {
  try {
    const account = await Account.findOne({ userId: req.userId })
    if (!account)
      return next(createError(403, "You dont have balance in your account"))

    res.status(200).send({ balance: account.balance })
  } catch (error) {
    next(error)
  }
}

export const transfer = async (req, res, next) => {
  try {
    const session = await mongoose.startSession()

    session.startTransaction()
    const { amount, to } = req.body

    //Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    )

    if (!account || account.balance < amount) {
      await session.abortTransaction()
      return next(createError(400, "Insufficient balance"))
    }

    const toAccount = await Account.findOne({ userId: to }).session(session)

    if (!toAccount) {
      await session.abortTransaction()
      return next(createError(400, "Invalid account"))
    }

    //Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session)

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session)

    // Commit the transaction
    await session.commitTransaction()

    res.status(200).send({ message: "Transfer successful" })
  } catch (error) {
    next(error)
  }
}
