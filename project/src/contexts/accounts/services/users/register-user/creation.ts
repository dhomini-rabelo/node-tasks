import { IUser, IUserParams } from '../../../../../application/db/schemas/users'
import { db } from '../../../../../core/db'
import { HashModule } from '../../../../../core/dependencies'

export class CreateUserService {
  async run(validData: IUserParams): Promise<IUser> {
    return db.User.operations.create({
      ...validData,
      password: HashModule.generate(validData.password),
    })
  }
}
