import { MongoClient } from "mongodb"

// Workaround for Node 22 OpenSSL compatibility with MongoDB
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const uri = process.env.MONGODB_URI || ""

if (!uri) {
  throw new Error("MONGODB_URI not set in environment variables")
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!(global as any)._mongoClientPromise) {
  // Simplified connection - TLS workaround handled by env var above
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
  })
  clientPromise = client.connect()
  ;(global as any)._mongoClientPromise = clientPromise
} else {
  clientPromise = (global as any)._mongoClientPromise
}

// Immediately connect at server start
clientPromise
  .then(() => {
    console.log("[MongoDB] Connected at server start.")
  })
  .catch((err) => {
    console.error("[MongoDB] Failed to connect at server start:", err)
  })

export default clientPromise
