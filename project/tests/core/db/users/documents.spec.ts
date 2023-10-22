import { beforeAll, describe, expect, it } from 'vitest'
import { db } from '../../../../src/core/dependencies/db'
import { createUser, createUsers } from '../../../__utils__/factories/users'
import { some } from '../../dependencies/modules/jwt.spec'
import '../../../__utils__/setup/mongoose'
import { UserModelSchema } from './_index'

describe('db.User.documents', () => {
  const users = db.User.documents

  beforeAll(async () => {
    await createUsers(7)
  })

  it('should return all users', async () => {
    const query = await users.all()
    expect(query.length).toBeGreaterThan(1)
    query.map((user) =>
      expect(user).toEqual(expect.objectContaining(UserModelSchema)),
    )
  })

  it('should find users that username contains "a"', async () => {
    const query = await users.find({
      username: 'a',
    })
    query.map((user) =>
      expect(user.username).toEqual(expect.stringMatching(/a/)),
    )
  })

  it('should find specific user', async () => {
    const username = some.text()
    await createUser({ username })
    const user = await users.findOne({
      username,
    })
    expect(user).toEqual(
      expect.objectContaining({
        ...UserModelSchema,
        username,
      }),
    )
  })
})
