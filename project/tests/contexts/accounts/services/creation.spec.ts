import { CreateUserService } from '../../../../src/contexts/accounts/services/users/register-user/creation'
import '../../../__utils__/setup/mongoose'
import { db } from '../../../../src/core/dependencies/db'
import { UserModelSchema } from '../../../core/db/users/_index'
import { createUserData } from '../../../__utils__/factories/users'

describe('CreateUserService', () => {
  const service = new CreateUserService()

  it('should create a user with encrypted password', async () => {
    const userData = createUserData()
    const response = await service.run(userData)
    expect(response).toEqual(UserModelSchema)

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
