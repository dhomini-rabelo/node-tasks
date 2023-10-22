import { MongoMemoryServer } from 'mongodb-memory-server'
import * as mongoose from 'mongoose'

/* eslint-disable */
export default async function globalSetup() {
  const instance = await MongoMemoryServer.create()
  // @ts-ignore
  global.__MONGOINSTANCE = instance
  process.env.TEST_MONGO_URL = instance.getUri()
  await mongoose.connect(process.env.TEST_MONGO_URL)
  await mongoose.connection.db.dropDatabase()

  return async () => {
    await mongoose.disconnect()
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE
    await instance.stop()
  }
}
