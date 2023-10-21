import { describe, expect, it, vi } from 'vitest'
import { ValidateUserDataService } from '.'
import { some } from '../../../../../../tests/utils/some'
import '../../../../../../tests/setup/mongoose'
import { createUser } from '../../../../../../tests/factories/users'
import { ValidationError } from '../../../../../../application/http/middlewares/error/exceptions/ValidationError'
import { RegisterUserSchema } from './schemas'

vi.mock('./schemas', () => {
  return {
    RegisterUserSchema: {
      parse: vi.fn((data) => data),
    },
  }
})

describe('ValidateUserDataService', () => {
  const validation = new ValidateUserDataService()

  it('should throw ValidationError when username already exists', async () => {
    const userData = { username: some.text(), password: some.text(10) }
    await createUser({ username: userData.username })
    expect(async () => {
      await validation.run({
        username: userData.username,
        password: userData.password,
        confirm_password: userData.password,
      })
    }).rejects.toThrow(ValidationError)
  })

  it('should ensure data validation with schema', async () => {
    const userData = { username: some.text(), password: some.text(10) }
    await validation.run({
      username: userData.username,
      password: userData.password,
      confirm_password: userData.password,
    })
    expect(RegisterUserSchema.parse).toHaveBeenCalled()
  })
})
