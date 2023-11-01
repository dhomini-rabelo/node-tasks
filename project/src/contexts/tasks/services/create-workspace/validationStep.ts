import { IWorkspaceParams } from '@/application/db/schemas/workspace'
import { DynamicErrors, ErrorMessages } from '@/application/http/error/messages'
import { IService } from '@/core/contracts/service'
import * as zod from 'zod'

export class ValidateWorkspaceDataStep extends IService {
  run(payload: Partial<IWorkspaceParams>) {
    return WorkspaceSchema.parse(payload)
  }
}

export const WorkspaceSchema = zod.object({
  username: zod
    .string({
      required_error: ErrorMessages.REQUIRED,
      invalid_type_error: ErrorMessages.INVALID_VALUE,
    })
    .min(4, DynamicErrors.minLength(3))
    .max(64, DynamicErrors.maxLength(64)),
  description: zod.string({
    required_error: ErrorMessages.REQUIRED,
    invalid_type_error: ErrorMessages.INVALID_VALUE,
  }),
})
