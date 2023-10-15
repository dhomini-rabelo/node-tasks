import { UserModel } from '../../../../mongoose-models/users'
import { IUserRepository } from '../../interfaces'

export class MongooseUserRepository implements IUserRepository {
  all() {
    return UserModel.find()
  }
}
