import mongoose from "mongoose"
const { Schema } = mongoose

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
})

export default mongoose.model("Account", accountSchema)
