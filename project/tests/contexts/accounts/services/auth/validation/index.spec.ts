import { vi } from 'vitest'
import { LoginSchema } from '@/contexts/accounts/services/auth/validation/schema'
import { some } from '../../../../../__utils__/utils/some'
import { ValidateUserDataService } from '@/contexts/accounts/services/auth/validation'

vi.mock(
  '../../../../../../src/contexts/accounts/services/auth/validation/schema',
  () => {
    return {
      LoginSchema: {
        parse: vi.fn((data) => data),
      },
    }
  },
)

describe('ValidateUserDataService', () => {
  const validation = new ValidateUserDataService()

  it('should ensure data validation with schema', async () => {
    const userData = { username: some.text(), password: some.text(10) }
    const response = await validation.run({
      username: userData.username,
      password: userData.password,
    })
    expect(response).toEqual(userData)
    expect(LoginSchema.parse).toHaveBeenCalled()
  })
})
