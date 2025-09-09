import { MongoClient } from "mongodb"

const url = `mongodb+srv://somn45:${process.env.NEXT_PUBLIC_MONGODB_PASSWORD}@cluster.mawy1h6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`
let connectDB: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // 개발 중 재실행을 막음
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url).connect()
}

export { connectDB }