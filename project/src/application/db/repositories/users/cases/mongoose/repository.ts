import { UserModel } from '../../../../models/mongoose/users'
import { IUserCleanParams } from '../../../../schemas/users'
import { IUserRepository } from '../../interfaces'
import { UserModelFormatter } from './utils/formatter'

export class MongooseUserRepository implements IUserRepository {
  private formatter = new UserModelFormatter()

  async all() {
    return this.formatter.formatAll(await UserModel.find())
  }

  async find(params: Partial<IUserCleanParams>) {
    return this.formatter.formatAll(await UserModel.find(params))
  }

  async findOne(params: Partial<IUserCleanParams>) {
    return this.formatter.formatOrNull(await UserModel.findOne(params))
  }
}
