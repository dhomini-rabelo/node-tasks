import { UserModel } from '../../../../mongoose-models/users'
import { IUser } from '../../../../schemas/users'
import { IUserOperations } from '../../interfaces'

export class MongooseUserOperations implements IUserOperations {
  async create(data: Omit<IUser, '_id'>) {
    const newUser = new UserModel(data)
    return newUser.save()
  }
}
