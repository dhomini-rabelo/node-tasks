import { db } from '../../../dependencies/db'
import { createUser, createUsers } from '../../../../../tests/factories/users'
import '../../../../../tests/setup/mongoose'
import { UserModelSchema } from './_index'
import { some } from '../../../../../tests/utils/some'

describe('db.User.documents', () => {
  const sut = db.User.documents

  beforeAll(async () => {
    await createUsers(2)
  })

  it('should return all users', async () => {
    const query = await sut.all()
    expect(query.length).toBeGreaterThan(1)
    query.forEach((user) => {
      expect(user).toEqual(UserModelSchema)
    })
  })

  it('should find users that username contains "a"', async () => {
    const query = await sut.find({
      username: 'a',
    })
    query.map((user) =>
      expect(user.username).toEqual(expect.stringMatching(/a/)),
    )
  })

  it('should return empty list when not found nothing', async () => {
    const query = await sut.find({
      username: 'inexistent-username',
    })
    expect(query).toStrictEqual([])
  })

  it('should find specific user', async () => {
    const username = some.text()
    await createUser({ username })
    const user = await sut.findOne({
      username,
    })
    expect(user).toEqual(UserModelSchema)
  })

  it('should return null when not found nothing', async () => {
    const user = await sut.findOne({
      username: 'inexistent-username',
    })
    expect(user).toBeNull()
  })
})
