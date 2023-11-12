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

  query(user: Partial<IUserSearch>) {
    const { id, ...rest } = user
    return removeUndefinedKeys({
      _id: id,
      ...rest,
    })
  }
}
