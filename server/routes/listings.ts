import express from "express"
import { ObjectId } from "mongodb"
import db from "../db/conn"
const router = express.Router()

// custom middleware router-level middleware This code is executed for every request to the router
const myLogger = function (req, res, next: () => void) {
  console.log("LOGGED")
  next()
}

// custom middleware router-level middleware This code is executed for every request to the router
const myNextLogger = function (req, res, next: () => void) {
  console.log("LOGGED NEXT")
  next()
}

router.use(myLogger)
router.use(myNextLogger)

router.get("/", async (req, res) => {
  let collection = db.collection("listingsAndReviews")
  const results = await collection.find({}).limit(3).toArray()
  res.send(results).status(200)
})

router.get("/:id", async (req, res) => {
  let collection = db.collection("listingsAndReviews")
  const id = new ObjectId(req.params.id)
  let query = { _id: id }
  let result = await collection.findOne(query)

  if (!result) res.send("Not found").status(404)
  else res.send(result).status(200)
})

router.post("/", async (req, res) => {
  let collection = db.collection("listingsAndReviews")
  const newListing = req.body
  const results = await collection.insertOne(newListing)
  res.send(results).status(200)
})

router.put("/:id", async (req, res) => {
  let collection = db.collection("listingsAndReviews")
  const id = new ObjectId(req.params.id)
  const listingData = req.body

  const result = await collection.updateOne({ _id: id }, { $set: listingData })
  console.log(result)

  if (result.modifiedCount === 0) {
    res.status(404).send("User not found")
  } else {
    res.status(200).send("User data updated successfully")
  }
})

router.delete("/:id", async (req, res) => {
  let collection = db.collection("listingsAndReviews")
  const id = new ObjectId(req.params.id)

  const result = await collection.deleteOne({ _id: id })
  console.log(result)

  if (result.deletedCount === 0) {
    res.status(404).send("User not found")
  } else {
    res.status(200).send("User deleted successfully")
  }
})

// custom error-handling middleware example
router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

export default router
