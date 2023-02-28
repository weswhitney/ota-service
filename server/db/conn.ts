import { MongoClient } from "mongodb"

// interface Pet {
//   name: string;
//   kind: 'dog' | 'cat' | 'fish';
// }

const client = new MongoClient("mongodb://localhost:27017/sample_airbnb")
const db = client.db("sample_airbnb")

export default db
