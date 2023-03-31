import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    usernameIsVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
  },
  { strict: false }
)

const User = mongoose.model("users", UserSchema)

export default User
