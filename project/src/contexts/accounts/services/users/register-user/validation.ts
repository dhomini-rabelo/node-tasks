import { IUserParams } from '../../../../../application/db/schemas/users'
import { RegisterUserSchema } from '../../../controllers/users/schemas'
import { db } from '../../../../../core/db'

export class ValidateUserDataService {
  async run(inputData: any | IUserParams): Promise<IUserParams> {
    const data = RegisterUserSchema.parse(inputData)
    await this.validateDatabaseRules(data)
    return data
  }

  async validateDatabaseRules(data: IUserParams) {
    const duplicatedUsernameError = !!(await db.User.documents.find({
      username: data.username,
    }))
    if (duplicatedUsernameError) {
      throw new Error('Username duplicated!')
    }
  }
}
