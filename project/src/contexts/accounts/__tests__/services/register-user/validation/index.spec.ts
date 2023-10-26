import { vi } from 'vitest'
import { ValidateUserDataService } from '../../../../services/users/register-user/validation'
import '../../../../../../../tests/setup/mongoose'
import {
  createUser,
  createUserData,
} from '../../../../../../../tests/factories/users'
import { ValidationError } from '../../../../../../application/http/middlewares/error/exceptions/ValidationError'
import { RegisterUserSchema } from '../../../../services/users/register-user/validation/schemas'

vi.mock('../../../../services/users/register-user/validation/schemas', () => {
  return {
    RegisterUserSchema: {
      parse: vi.fn((data) => data),
    },
  }
})

describe('ValidateUserDataService', () => {
  const sut = new ValidateUserDataService()

  it('should ensure data validation with schema', async () => {
    const userData = createUserData()
    const response = await sut.run({
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
      await sut.run({
        username: userData.username,
        password: userData.password,
        confirm_password: userData.password,
      })
    }).rejects.toThrow(ValidationError)
  })
})
