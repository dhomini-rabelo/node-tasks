import { DynamicErrors, ErrorMessages } from '@/application/http/error/messages'
import { ValidationError } from '@/application/http/middlewares/error/exceptions/ValidationError'
import { db } from '@/core/dependencies/db'
import * as zod from 'zod'
import { ICreateTaskServiceRequest } from '.'

export interface IValidationStepResponse {
  title: string
  description: string | null
}

export class ValidationStep {
  static schema = zod.object({
    title: zod
      .string({
        required_error: ErrorMessages.REQUIRED,
        invalid_type_error: ErrorMessages.INVALID_VALUE,
      })
      .min(3, DynamicErrors.minLength(3))
      .max(64, DynamicErrors.maxLength(64)),
    description: zod
      .string({
        required_error: ErrorMessages.REQUIRED,
        invalid_type_error: ErrorMessages.INVALID_VALUE,
      })
      .nullable()
      .default(null),
  })

  async run(
    request: ICreateTaskServiceRequest,
  ): Promise<IValidationStepResponse> {
    const validData = ValidationStep.schema.parse(request.data)
    await this.validateDatabaseRules(validData)
    return validData
  }

  private async validateDatabaseRules(data: {
    title: string
    description: string | null
  }) {
    const duplicatedTitleError = !!(await db.Task.documents.findOne({
      title: data.title,
    }))
    if (duplicatedTitleError) {
      throw new ValidationError({
        title: [ErrorMessages.DUPLICATED_VALUE],
      })
    }
  }
}
