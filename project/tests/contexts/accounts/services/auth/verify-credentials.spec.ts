import { VerifyCredentialsService } from '@/contexts/accounts/services/auth/verify-credentials'
import { some } from '../../../../__utils__/utils/some'
import '../../../../__utils__/setup/mongoose'
import { CreateUserService } from '@/contexts/accounts/services/users/register-user/creation'
import { ForbiddenHttpError } from '@/application/http/middlewares/error/exceptions/HttpErrors/Forbidden'
import { createUserData } from '../../../../__utils__/factories/users'

describe('VerifyCredentialsService', () => {
  const sut = new VerifyCredentialsService()
  const createUser = new CreateUserService()

  it('should return user when the credentials is correct', async () => {
    const credentials = { username: some.text(), password: some.text(10) }
    await createUser.run(credentials)
    await sut.run(credentials)
  })

  it('should throw ForbiddenHttpError when username does not exist', async () => {
    const credentials = { username: some.text(), password: some.text(10) }
    await expect(async () => sut.run(credentials)).rejects.toThrow(
      ForbiddenHttpError,
    )
  })

  it('should throw ForbiddenHttpError when password is incorrect', async () => {
    const userData = createUserData()
    await createUser.run(userData)
    const invalidPassword = some.text(10)
    const credentials = {
      username: userData.username,
      password: invalidPassword,
    }
    await expect(async () => sut.run(credentials)).rejects.toThrow(
      ForbiddenHttpError,
    )
  })
})
