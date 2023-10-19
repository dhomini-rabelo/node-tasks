import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { db } from '../../core/dependencies/db'
import { MongooseUserOperations } from '../../application/db/repositories/users/cases/mongoose/operations'

let mongoServer: MongoMemoryServer

describe('MongooseUserOperations', () => {
  const userOperations = new MongooseUserOperations()

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('should ensure that envSchema is working', async () => {
    expect(await db.User.documents.all()).toStrictEqual([])
  })
})
