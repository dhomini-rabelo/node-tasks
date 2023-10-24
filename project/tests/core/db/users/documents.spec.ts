import { db } from '../../../../src/core/dependencies/db'
import { createUser, createUsers } from '../../../__utils__/factories/users'
import { some } from '../../dependencies/modules/jwt.spec'
import '../../../__utils__/setup/mongoose'
import { UserModelSchema } from './_index'
import mongoose from 'mongoose'

describe('db.User.documents', () => {
  const users = db.User.documents

  beforeAll(async () => {
    await createUsers(2)
  })

  it('should return all users', async () => {
    const query = await users.all()
    expect(query.length).toBeGreaterThan(1)
    query.forEach((user) => {
      expect(user).toEqual(UserModelSchema)
    })
  })

  it('should find users that username contains "a"', async () => {
    const query = await users.find({
      username: 'a',
    })
    query.map((user) =>
      expect(user.username).toEqual(expect.stringMatching(/a/)),
    )
  })

  it('should return empty list when not found nothing', async () => {
    const query = await users.find({
      username: 'inexistent-username',
    })
    expect(query).toStrictEqual([])
  })

  it('should find specific user', async () => {
    const username = some.text()
    await createUser({ username })
    const user = await users.findOne({
      username,
    })
    expect(user).toEqual(UserModelSchema)
  })

  it('should return null when not found nothing', async () => {
    const user = await users.findOne({
      username: 'inexistent-username',
    })
    expect(user).toBeNull()
  })
})
