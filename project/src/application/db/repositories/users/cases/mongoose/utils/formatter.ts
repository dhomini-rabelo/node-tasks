import { IUserModel } from '@/application/db/models/mongoose/users'
import { IUser, IUserSearch } from '@/application/db/schemas/users'

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

  formatOrNull(user: IUserModel | null) {
    return user ? this.format(user) : null
  }

  parse(userSchema: Partial<IUserSearch>) {
    const { id, ...rest } = userSchema
    return {
      _id: String(id),
      ...rest,
    }
  }
}
