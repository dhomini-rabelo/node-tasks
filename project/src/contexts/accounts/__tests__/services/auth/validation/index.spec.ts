import { vi } from 'vitest'
import { LoginSchema } from '@/contexts/accounts/services/auth/validation/schema'
import { ValidateUserDataService } from '@/contexts/accounts/services/auth/validation'
import { createUserData } from '../../../../../../../tests/factories/users'

vi.mock('../../../../services/auth/validation/schema', () => {
  return {
    LoginSchema: {
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
    })
    expect(response).toEqual(userData)
    expect(LoginSchema.parse).toHaveBeenCalled()
  })
})
