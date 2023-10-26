import { db } from '../../../dependencies/db'
import { UserModelSchema } from './_index'
import '../../../../../tests/setup/mongoose'
import { some } from '../../../../../tests/utils/some'

describe('db.User.operations', () => {
  const sut = db.User.operations

  it('should create a user', async () => {
    const user = await sut.create({
      username: some.text(),
      password: some.text(),
    })
    expect(user).toEqual(UserModelSchema)
  })

  it('should throw an error when required fields were not submitted', async () => {
    await expect(async () => {
      // @ts-expect-error creating user without username
      await sut.create({
        password: some.text(),
      })
    }).rejects.toThrow()
    await expect(async () => {
      // @ts-expect-error creating user without password
      await sut.create({
        username: some.text(),
      })
    }).rejects.toThrow()
  })

  it('should throw an error when username is not unique', async () => {
    const username = some.text()
    const createdUser = await sut.create({
      username,
      password: some.text(),
    })
    await expect(async () => {
      await sut.create({
        username: createdUser.username,
        password: some.text(),
      })
    }).rejects.toThrow()
  })

  it('should throw an error when username is too short', async () => {
    await expect(async () => {
      await sut.create({
        username: some.text(2),
        password: some.text(),
      })
    }).rejects.toThrow()
  })

  it('should throw an error when username is too long', async () => {
    await expect(async () => {
      await sut.create({
        username: some.text(65),
        password: some.text(),
      })
    }).rejects.toThrow()
  })
})
