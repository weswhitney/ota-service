import express from "express"
const router = express.Router()
import passport from "passport"
// import db from "../db/conn"

// custom middleware router-level middleware This code is executed for every request to the router
const myLogger = function (req: any, res: any, next: () => void) {
  console.log("LOGGED AUTH")
  next()
}

router.use(myLogger)

// router.post("/", (req, res, next) => {
//   passport.authenticate("local", (err: any, user: Express.User, info: any) => {
//     if (err) {
//       return res.status(400).json({ errors: err })
//     }
//     if (!user) {
//       return res.status(400).json({ errors: "no user found" })
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return res.status(400).json({ errors: err })
//       }
//       return res.status(200).json({ success: `Logged in ${user}` })
//     })
//   })(req, res, next)
// })

router.get("/password")

router.get(
  "/my-protected-route",
  passport.authenticate("local"),
  (req, res) => {
    // handle request for protected resource here
    console.log("called my protected route for is authenticated")
    res.status(200)
  }
)

router.get("/check-user", (req, res) => {
  if (req.user) {
    // handle request for protected resource here
    console.log(`user is available and are ${req.user}`)
    return res.status(200)
  } else {
    // redirect to login page or show unauthorized error message
    console.log("no user found for check user route")
    return res.status(200)
  }
})

router.get("/check-session", (req, res) => {
  if (req.cookies.session) {
    // handle request for protected resource here
    console.log(`has session for user ${req.cookies.session}`)
    return res.status(200)
  } else {
    // redirect to login page or show unauthorized error message
    console.log("no session for check-session")
  }
})

// router.post("/signup", async (req, res) => {
//   console.log("called auth/signup")
//   let collection = db.collection("users")
//   const newUser = req.body
//   const results = await collection.insertOne(newUser)
//   res.send(results).status(200)
// })

// router.post(
//   "/login/password",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// )

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    console.log(err)
  })
  res.redirect("/")
  next()
})

export default router
