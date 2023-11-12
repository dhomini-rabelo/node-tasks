import { IUserModel } from '@/application/db/models/mongoose/users'
import { IUser, IUserSearch } from '@/application/db/schemas/users'
import { removeUndefinedKeys } from '@/application/utils/generic'

export class UserDataAdapter {
  format(user: IUserModel): IUser {
    const { _id, ...rest } = user.toJSON({
      versionKey: false,
    })

    return {
      id: String(_id),
      ...rest,
    }
  }

  formatAll(users: IUserModel[]) {
    return users.map((user) => this.format(user))
  }

  parse(user: IUser) {
    const { id, ...rest } = user
    return {
      _id: id,
      ...rest,
    }
  }

  query(user: Partial<IUserSearch>) {
    const { id, ...rest } = user
    return removeUndefinedKeys({
      _id: id,
      ...rest,
    })
  }
}
