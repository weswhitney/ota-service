import express, { Express, Request, Response } from "express"
import listings from "./routes/listings"

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server")
})

app.use("/listings", listings)

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at localhost:3000`)
})
