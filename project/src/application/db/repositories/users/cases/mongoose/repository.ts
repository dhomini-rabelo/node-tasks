import { UserModel } from '../../../../mongoose-models/users'
import { IUser } from '../../../../schemas/users'
import { IUserRepository } from '../../interfaces'

export class MongooseUserRepository implements IUserRepository {
  all() {
    return UserModel.find()
  }

  find(params: Partial<IUser>) {
    return UserModel.find(params)
  }

  findOne(params: Partial<IUser>) {
    return UserModel.findOne(params)
  }
}
