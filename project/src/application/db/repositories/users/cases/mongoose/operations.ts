import { UserModel } from '../../../../mongoose-models/users'
import { IUserParams } from '../../../../schemas/users'
import { IUserOperations } from '../../interfaces'

export class MongooseUserOperations implements IUserOperations {
  async create(data: IUserParams) {
    const newUser = new UserModel(data)
    return newUser.save()
  }
}
