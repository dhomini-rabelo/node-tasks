import { UnauthorizedHttpError } from '@/application/http/middlewares/error/exceptions/HttpErrors/Unauthorized'
import { VerifyCredentialsService } from '@/contexts/accounts/services/auth/verify-credentials'
import { CreateUserService } from '@/contexts/accounts/services/users/register-user/creation'
import { createUserData } from '../../../../../../tests/factories/users'
import '../../../../../../tests/setup/mongoose'
import { some } from '../../../../../../tests/utils/some'

describe('VerifyCredentialsService', () => {
  const sut = new VerifyCredentialsService()
  const createUser = new CreateUserService()

  it('should return user when the credentials is correct', async () => {
    const credentials = { username: some.text(), password: some.text(10) }
    await createUser.run(credentials)
    await sut.run(credentials)
  })

  it('should throw UnauthorizedHttpError when username does not exist', async () => {
    const credentials = { username: some.text(), password: some.text(10) }
    await expect(async () => sut.run(credentials)).rejects.toThrow(
      UnauthorizedHttpError,
    )
  })

  it('should throw UnauthorizedHttpError when password is incorrect', async () => {
    const userData = createUserData()
    await createUser.run(userData)
    const invalidPassword = some.text(10)
    const credentials = {
      username: userData.username,
      password: invalidPassword,
    }
    await expect(async () => sut.run(credentials)).rejects.toThrow(
      UnauthorizedHttpError,
    )
  })
})
