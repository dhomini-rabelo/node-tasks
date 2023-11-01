import { UserModel } from '../../../../models/mongoose/users'
import { IUserSearch } from '../../../../schemas/users'
import { IUserRepository } from '../../interfaces'
import { UserDataAdapter } from './utils/adapter'

export class MongooseUserRepository implements IUserRepository {
  private adapter = new UserDataAdapter()

  async all() {
    return this.adapter.formatAll(await UserModel.find())
  }

  async find(params: Partial<IUserSearch>) {
    return this.adapter.formatAll(
      await UserModel.find(this.adapter.parse(params)),
    )
  }

  async findOne(params: Partial<IUserSearch>) {
    const user = await UserModel.findOne(this.adapter.parse(params))
    return user ? this.adapter.format(user) : null
  }

  async get(params: Partial<IUserSearch>) {
    const user = await UserModel.findOne(this.adapter.parse(params))

    if (!user) {
      throw new Error('test')
    }

    return this.adapter.format(user)
  }
}
