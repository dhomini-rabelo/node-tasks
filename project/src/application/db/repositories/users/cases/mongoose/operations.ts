import { UserModel } from '../../../../models/mongoose/users'
import { IUserParams } from '../../../../schemas/users'
import { IUserOperations } from '../../interfaces'

export class MongooseUserOperations implements IUserOperations {
  async create(data: IUserParams) {
    const newUser = new UserModel(data)
    return newUser.save()
  }

  async createMany(dataSet: IUserParams[]) {
    return UserModel.insertMany(dataSet)
  }
}
