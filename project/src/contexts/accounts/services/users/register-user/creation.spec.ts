import { describe, expect, it } from 'vitest'
import { some } from '../../../../../tests/utils/some'
import { CreateUserService } from './creation'
import '../../../../../tests/setup/mongoose'
import { db } from '../../../../../core/dependencies/db'
import { UserModelSchema } from '../../../../../tests/tests/db/users/_index'

describe('CreateUserService', () => {
  const service = new CreateUserService()

  it('should create a user with encrypted password', async () => {
    const userData = { username: some.text(), password: some.text(10) }
    const response = await service.run(userData)
    expect(response).toEqual(expect.objectContaining(UserModelSchema))

    const createdUser = await db.User.documents.findOne({
      username: userData.username,
    })
    expect(createdUser?.password).not.toEqual(userData.password)
    expect(createdUser?.password).toEqual(response.password)
  })

  it('should throw any database errors', async () => {
    await expect(async () => {
      // @ts-expect-error throw required error
      await service.run({})
    }).rejects.toThrow()
  })
})
