// const MongoClient = require("mongodb").MongoClient

// MongoClient.connect(
//   "mongodb://localhost:27017/sample_airbnb",
//   (err: any, client: { db: (arg0: string) => any }) => {
//     if (err) throw err

//     const db = client.db("sample_airbnb")

// db.collection("mammals")
//   .find()
//   .toArray((err: any, result: any) => {
//     if (err) throw err

//     console.log(result)
//   })
// }
// )

// export default db

import { MongoClient } from "mongodb"

// interface Pet {
//   name: string;
//   kind: 'dog' | 'cat' | 'fish';
// }

const client = new MongoClient("mongodb://localhost:27017/sample_airbnb")
const db = client.db("sample_airbnb")

export default db
