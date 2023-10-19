import { UserModel } from '../../../../models/mongoose/users'
import { IUserCleanParams } from '../../../../schemas/users'
import { IUserRepository } from '../../interfaces'

export class MongooseUserRepository implements IUserRepository {
  all() {
    return UserModel.find()
  }

  find(params: Partial<IUserCleanParams>) {
    return UserModel.find(params)
  }

  findOne(params: Partial<IUserCleanParams>) {
    return UserModel.findOne(params)
  }
}
