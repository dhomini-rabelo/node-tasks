import { IUser } from '@/application/db/schemas/users'
import {
  IWorkspaceParams,
  IWorkspaceSimpleData,
} from '@/application/db/schemas/workspace'
import { DynamicErrors, ErrorMessages } from '@/application/http/error/messages'
import { ValidationError } from '@/application/http/middlewares/error/exceptions/ValidationError'
import { IService } from '@/core/contracts/service'
import { db } from '@/core/dependencies/db'
import * as zod from 'zod'

export class ValidateWorkspaceDataStep extends IService {
  async run(params: {
    payload: Partial<IWorkspaceParams>
    user: IUser
  }): Promise<IWorkspaceSimpleData> {
    const data = WorkspaceSchema.parse(params.payload)
    await this.validateDatabaseRules({
      user_id: params.user.id,
      title: data.title,
    })
    return data
  }

  private async validateDatabaseRules(data: {
    user_id: string
    title: string
  }) {
    const duplicatedWorkspaceTitle = !!(await db.Workspace.documents.findOne({
      user_id: data.user_id,
      title: data.title,
    }))
    if (duplicatedWorkspaceTitle) {
      throw new ValidationError({
        title: [ErrorMessages.DUPLICATED_VALUE],
      })
    }
  }
}

export const WorkspaceSchema = zod.object({
  title: zod
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
