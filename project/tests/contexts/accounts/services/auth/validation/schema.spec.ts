import { LoginSchema } from '@/contexts/accounts/services/auth/validation/schema'
import {
  getFormattedZodError,
  getZodSuccess,
} from '../../../../../__utils__/utils/zod'
import { some } from '../../../../../__utils__/utils/some'
import { ErrorMessages } from '@/application/http/error/messages'

describe('LoginSchema', () => {
  it('should verify a valid schema', () => {
    const userData = { username: some.text(), password: some.text(10) }
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
