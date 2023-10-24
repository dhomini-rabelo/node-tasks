import { ErrorMessages } from '@/application/http/error/messages'
import * as zod from 'zod'

export const LoginSchema = zod.object({
  username: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
  password: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
})
