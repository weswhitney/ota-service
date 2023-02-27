import express from "express"
import { WithId, Document } from "mongodb"
import db from "../db/conn"
const router = express.Router()

router.get("/", async (req, res) => {
  let collection = db.collection("listingsAndReviews")
  const results = await collection.find({}).limit(50).toArray()
  res.send(results).status(200)
})

export default router
