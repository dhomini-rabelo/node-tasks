import mongoose from 'mongoose'
import { beforeAll } from 'vitest'

beforeAll(async () => {
  if (mongoose.connections[0].readyState === 0) {
    await mongoose.connect(String(process.env.TEST_MONGO_URL))
  }
})

// afterAll(async () => {
// if (mongoose.connections[0].readyState !== 1) {
//   await mongoose.disconnect()
// }
// })
