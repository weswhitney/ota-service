import bcrypt from "bcrypt"
import User from "../models/Users"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"

passport.serializeUser((user, done) => {
  console.log("serializeUser ", user)
  done(null, user)
})

passport.deserializeUser((user: any, done) => {
  console.log("deserializerUser ", user)
  User.findById(user)
  done(null, user)
})

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      User.findOne({ username: username }).then((user) => {
        if (!user) {
          const newUser = new User({ username, password })
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              newUser.password = hash
              newUser
                .save()
                .then((user) => {
                  return done(null, user)
                })
                .catch((err) => {
                  return done(null, false, { message: err })
                })
            })
          })
        } else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err

            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: "Wrong password" })
            }
          })
        }
      })
    }
  )
)

export default passport
