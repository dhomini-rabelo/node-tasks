import { IUser, IUserParams } from '../../../../../application/db/schemas/users'
import { db } from '../../../../../core/db'

export class CreateUserService {
  async run(validData: IUserParams): Promise<IUser> {
    return db.User.operations.create(validData)
  }
}
