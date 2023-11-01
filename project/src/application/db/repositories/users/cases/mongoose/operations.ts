import { UserModel } from '../../../../models/mongoose/users'
import { IUserParams } from '../../../../schemas/users'
import { IUserOperations } from '../../interfaces'
import { UserDataAdapter } from './utils/adapter'

export class MongooseUserOperations implements IUserOperations {
  private adapter = new UserDataAdapter()

  async create(data: IUserParams) {
    const newUser = new UserModel(data)
    return this.adapter.format(await newUser.save())
  }

  async createMany(dataSet: IUserParams[]) {
    return this.adapter.formatAll(await UserModel.insertMany(dataSet))
  }
}
