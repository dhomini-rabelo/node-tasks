import * as zod from 'zod'
import {
  DynamicErrors,
  ErrorMessages,
} from '../../../../../../application/http/error/messages'

export const RegisterUserSchema = zod
  .object({
    username: zod
      .string({
        required_error: ErrorMessages.REQUIRED,
        invalid_type_error: ErrorMessages.INVALID_VALUE,
      })
      .min(4, DynamicErrors.minLength(3))
      .max(64, DynamicErrors.maxLength(64)),
    password: zod
      .string({
        required_error: ErrorMessages.REQUIRED,
        invalid_type_error: ErrorMessages.INVALID_VALUE,
      })
      .min(8, DynamicErrors.minLength(8)),
    confirm_password: zod
      .string({
        required_error: ErrorMessages.REQUIRED,
        invalid_type_error: ErrorMessages.INVALID_VALUE,
      })
      .min(1, ErrorMessages.REQUIRED),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas são diferentes',
    path: ['confirm_password'], // field with error
  })
