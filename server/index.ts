import express, { Express, Request, Response } from "express"
import listings from "./routes/listings"
import auth from "./routes/auth"
import bodyParser from "body-parser"
import session from "express-session"
// import { ConnectMongoDBSession as MongoDBStore } from "connect-mongodb-session"
const MongoDBStore = require("connect-mongodb-session")(session)
import passport from "passport"
// import db from "./db/conn"

const app: Express = express()

const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/sample_airbnb",
  collection: "sessions",
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
)
app.use(passport.authenticate("session"))

app.use("/listings", listings)
app.use("/login", auth)

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at localhost:3000`)
})
