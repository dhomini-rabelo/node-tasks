import { UserModel } from '../../../../models/mongoose/users'
import { IUserParams } from '../../../../schemas/users'
import { IUserOperations } from '../../interfaces'
import { UserModelFormatter } from './utils/formatter'

export class MongooseUserOperations implements IUserOperations {
  private formatter = new UserModelFormatter()

  async create(data: IUserParams) {
    const newUser = new UserModel(data)
    return this.formatter.format(await newUser.save())
  }

  async createMany(dataSet: IUserParams[]) {
    return this.formatter.formatAll(await UserModel.insertMany(dataSet))
  }
}
