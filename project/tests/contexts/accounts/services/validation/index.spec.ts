import { vi } from 'vitest'
import { ValidateUserDataService } from '../../../../../src/contexts/accounts/services/users/register-user/validation'
import '../../../../__utils__/setup/mongoose'
import {
  createUser,
  createUserData,
} from '../../../../__utils__/factories/users'
import { ValidationError } from '../../../../../src/application/http/middlewares/error/exceptions/ValidationError'
import { RegisterUserSchema } from '../../../../../src/contexts/accounts/services/users/register-user/validation/schemas'

vi.mock(
  '../../../../../src/contexts/accounts/services/users/register-user/validation/schemas',
  () => {
    return {
      RegisterUserSchema: {
        parse: vi.fn((data) => data),
      },
    }
  },
)

describe('ValidateUserDataService', () => {
  const validation = new ValidateUserDataService()

  it('should ensure data validation with schema', async () => {
    const userData = createUserData()
    const response = await validation.run({
      username: userData.username,
      password: userData.password,
      confirm_password: userData.password,
    })
    expect(response).toEqual(userData)
    expect(RegisterUserSchema.parse).toHaveBeenCalled()
  })

  it('should throw ValidationError when username already exists', async () => {
    const userData = createUserData()
    await createUser({ username: userData.username })
    expect(async () => {
      await validation.run({
        username: userData.username,
        password: userData.password,
        confirm_password: userData.password,
      })
    }).rejects.toThrow(ValidationError)
  })
})
