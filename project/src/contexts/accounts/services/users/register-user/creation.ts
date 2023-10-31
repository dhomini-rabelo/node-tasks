import { IUser, IUserParams } from '../../../../../application/db/schemas/users'
import { db } from '../../../../../core/dependencies/db'
import { HashModule } from '../../../../../core/dependencies/modules'

export class CreateUserStep {
  async run(validData: IUserParams): Promise<IUser> {
    return db.User.operations.create({
      ...validData,
      password: HashModule.generate(validData.password),
    })
  }
}
