import { describe, expect, it } from 'vitest'
import { db } from '../../../../core/dependencies/db'
import { some } from '../../dependencies/modules/jwt.spec'
import { UserModelSchema } from './_index'
import '../../../setup/mongoose'

describe('db.User.operations', () => {
  const operations = db.User.operations

  it('should create a user', async () => {
    const user = await operations.create({
      username: some.text(),
      password: some.text(),
    })
    expect(user).toEqual(expect.objectContaining(UserModelSchema))
  })

  it('should throw an error when required fields were not submitted', async () => {
    await expect(async () => {
      // @ts-expect-error creating user without username
      await operations.create({
        password: some.text(),
      })
    }).rejects.toThrow()
    await expect(async () => {
      // @ts-expect-error creating user without password
      await operations.create({
        username: some.text(),
      })
    }).rejects.toThrow()
  })

  it('should throw an error when username is not unique', async () => {
    const username = some.text()
    const createdUser = await operations.create({
      username,
      password: some.text(),
    })
    await expect(async () => {
      await operations.create({
        username: createdUser.username,
        password: some.text(),
      })
    }).rejects.toThrow()
  })

  it('should throw an error when username is too short', async () => {
    await expect(async () => {
      await operations.create({
        username: some.text(2),
        password: some.text(),
      })
    }).rejects.toThrow()
  })

  it('should throw an error when username is too long', async () => {
    await expect(async () => {
      await operations.create({
        username: some.text(65),
        password: some.text(),
      })
    }).rejects.toThrow()
  })
})
