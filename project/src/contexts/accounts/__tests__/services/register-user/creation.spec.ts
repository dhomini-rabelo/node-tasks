import { CreateUserService } from '../../../services/users/register-user/creation'
import '../../../../../../tests/setup/mongoose'
import { db } from '../../../../../core/dependencies/db'
import { UserModelSchema } from '../../../../../core/__tests__/db/users/_index'
import { createUserData } from '../../../../../../tests/factories/users'

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
