import express, { Express, Request, Response } from "express"
import session from "express-session"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"

import passport from "./passport/setup"
import auth from "./routes/auth"

import bodyParser from "body-parser"
import listings from "./routes/listings"

const app: Express = express()
const port = 5000
const MONGO_URI = "mongodb://localhost:27017/sample_airbnb"

mongoose
  .connect(MONGO_URI)
  // @ts-ignore
  .then(console.log(`Mongodb connected ${MONGO_URI}`))
  .catch((err) => console.log(err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  session({
    secret: "kittens",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", auth)

app.use("/listings", listings)

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at localhost:3000`)
})
