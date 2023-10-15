import { UserModel } from '../../../mongoose-models/users'
import { IUserRepository } from '../interface'

export class MongooseUserRepository implements IUserRepository {
  all() {
    return UserModel.find()
  }
}
