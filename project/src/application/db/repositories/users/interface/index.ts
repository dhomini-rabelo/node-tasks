import { IUser } from '../../../schemas/users'

export interface IUserRepository {
  all: () => Promise<IUser[]>
}

export interface IUserModel {
  documents: IUserRepository
}
