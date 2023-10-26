import { LoginSchema } from '@/contexts/accounts/services/auth/validation/schema'
import {
  getFormattedZodError,
  getZodSuccess,
} from '../../../../../__utils__/utils/zod'
import { ErrorMessages } from '@/application/http/error/messages'
import { createUserData } from '../../../../../__utils__/factories/users'

describe('LoginSchema', () => {
  it('should verify a valid schema', () => {
    const userData = createUserData()
    const data = getZodSuccess(LoginSchema, {
      username: userData.username,
      password: userData.password,
    })
    expect(data).toEqual({
      ...userData,
    })
  })

  it('should verify required errors', () => {
    const errors = getFormattedZodError(LoginSchema, {})
    expect(errors).toEqual({
      username: [ErrorMessages.REQUIRED],
      password: [ErrorMessages.REQUIRED],
    })
  })

  it('should verify invalid-value errors', () => {
    const errors = getFormattedZodError(LoginSchema, {
      username: 123,
      password: [],
    })
    expect(errors).toEqual({
      username: [ErrorMessages.INVALID_VALUE],
      password: [ErrorMessages.INVALID_VALUE],
    })
  })
})
