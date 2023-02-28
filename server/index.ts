import express, { Express, Request, Response } from "express"
import listings from "./routes/listings"
import bodyParser from "body-parser"

const app: Express = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server")
})

app.use("/listings", listings)

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at localhost:3000`)
})
