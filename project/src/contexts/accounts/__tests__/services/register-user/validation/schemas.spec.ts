import { RegisterUserSchema } from '../../../../services/users/register-user/validation/schemas'
import {
  DynamicErrors,
  ErrorMessages,
} from '../../../../../../application/http/error/messages'
import { some } from '../../../../../../../tests/utils/some'
import {
  getFormattedZodError,
  getZodSuccess,
} from '../../../../../../../tests/utils/zod'
import { createUserData } from '../../../../../../../tests/factories/users'

describe('RegisterUserSchema', () => {
  it('should verify a valid schema', () => {
    const userData = createUserData()
    const data = getZodSuccess(RegisterUserSchema, {
      username: userData.username,
      password: userData.password,
      confirm_password: userData.password,
    })
    expect(data).toEqual({
      ...userData,
      confirm_password: userData.password,
    })
  })

  it('should verify required errors', () => {
    const errors = getFormattedZodError(RegisterUserSchema, {})
    expect(errors).toEqual({
      username: [ErrorMessages.REQUIRED],
      password: [ErrorMessages.REQUIRED],
      confirm_password: [ErrorMessages.REQUIRED],
    })
  })

  it('should verify invalid-value errors', () => {
    const errors = getFormattedZodError(RegisterUserSchema, {
      username: 123,
      password: [],
      confirm_password: {},
    })
    expect(errors).toEqual({
      username: [ErrorMessages.INVALID_VALUE],
      password: [ErrorMessages.INVALID_VALUE],
      confirm_password: [ErrorMessages.INVALID_VALUE],
    })
  })

  it('should verify min-length errors', () => {
    const userData = { username: some.text(3 - 1), password: some.text(8 - 1) }
    const errors = getFormattedZodError(RegisterUserSchema, {
      username: userData.username,
      password: userData.password,
      confirm_password: userData.password,
    })
    expect(errors).toEqual({
      username: [DynamicErrors.minLength(3)],
      password: [DynamicErrors.minLength(8)],
    })
  })

  it('should verify max-length errors', () => {
    const userData = { username: some.text(64 + 1), password: some.text(10) }
    const errors = getFormattedZodError(RegisterUserSchema, {
      username: userData.username,
      password: userData.password,
      confirm_password: userData.password,
    })
    expect(errors).toEqual({
      username: [DynamicErrors.maxLength(64)],
    })
  })

  it('should verify distinct passwords error', () => {
    const userData = createUserData()
    const errors = getFormattedZodError(RegisterUserSchema, {
      username: userData.username,
      password: userData.password,
      confirm_password: some.text(11),
    })
    expect(errors).toEqual({
      confirm_password: ['As senhas são diferentes'],
    })
  })
})
