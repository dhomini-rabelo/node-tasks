import { ValidateUserDataStep } from '@/contexts/accounts/services/auth/validation'
import { LoginSchema } from '@/contexts/accounts/services/auth/validation/schema'
import { vi } from 'vitest'
import { createUserData } from '../../../../../../../tests/factories/users'

vi.mock('../../../../services/auth/validation/schema', () => {
  return {
    LoginSchema: {
      parse: vi.fn((data) => data),
    },
  }
})

describe('ValidateUserDataStep', () => {
  const sut = new ValidateUserDataStep()

  it('should ensure data validation with schema', async () => {
    const userData = createUserData()
    const response = await sut.run({
      username: userData.username,
      password: userData.password,
    })
    expect(response).toEqual(userData)
    expect(LoginSchema.parse).toHaveBeenCalled()
  })
})
