import { IUserParams } from '../../../../../../application/db/schemas/users'
import { RegisterUserSchema } from './schemas'
import { db } from '../../../../../../core/dependencies/db'
import { ValidationError } from '../../../../../../application/http/middlewares/error/exceptions/ValidationError'
import { ErrorMessages } from '../../../../../../application/http/error/messages'

export interface IRegisterUserParams extends IUserParams {
  confirm_password: string
}

export class ValidateUserDataService {
  async run(inputData: IRegisterUserParams): Promise<IUserParams> {
    const data = RegisterUserSchema.parse(inputData)
    await this.validateDatabaseRules(data)
    return {
      username: data.username,
      password: data.password,
    }
  }

  private async validateDatabaseRules(data: IUserParams) {
    const duplicatedUsernameError = !!(await db.User.documents.findOne({
      username: data.username,
    }))
    if (duplicatedUsernameError) {
      throw new ValidationError({
        username: [ErrorMessages.DUPLICATED_VALUE],
      })
    }
  }
}
