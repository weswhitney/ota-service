import express from "express"
const router = express.Router()
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import crypto from "crypto"
import { ObjectId } from "mongodb"
import db from "../db/conn"

const getUserByName = async (user, password, cb) => {
  crypto.pbkdf2(
    password,
    user.salt,
    310000,
    32,
    "sha256",
    (err, hashedPassword) => {
      if (err) {
        return cb(err)
      }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, {
          message: "Incorrect username or password.",
        })
      }
      return cb(null, user)
    }
  )
}

passport.use(
  new LocalStrategy((username: string, password: string, cb: Function) => {
    db.collection("users").findOne({ username: username })
  })
)

// router.get("/", (req, res, next) => {})

passport.serializeUser((user: any, cb) => {
  cb(null, { id: user._id.toString(), username: user.username })
})

passport.deserializeUser(async (user: any, cb) => {
  try {
    // const db = client.db('myapp'); // replace with your MongoDB database name
    const collection = db.collection("users")
    const foundUser = await collection.findOne({ _id: ObjectId(user.id) })
    cb(null, foundUser)
  } catch (err) {
    cb(err)
  }
})

router.post(
  "/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
)

export default router
