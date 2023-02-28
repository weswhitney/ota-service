import express from "express"
import { WithId, Document } from "mongodb"
import db from "../db/conn"
const router = express.Router()

router.get("/", async (req, res) => {
  let collection = db.collection("listingsAndReviews")
  const results = await collection.find({}).limit(3).toArray()
  res.send(results).status(200)
})

router.post("/", async (req, res) => {
  let collection = db.collection("listingsAndReviews")
  const newListing = req.body
  const results = await collection.insertOne(newListing)
  res.send(results).status(200)
})

export default router
