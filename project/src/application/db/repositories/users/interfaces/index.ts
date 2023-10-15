import { IUser, IUserParams } from '../../../schemas/users'

export interface IUserOperations {
  create: (data: IUserParams) => Promise<IUser>
}

export interface IUserRepository {
  all: () => Promise<IUser[]>
  find: (params: Partial<IUser>) => Promise<IUser[]>
  findOne: (params: Partial<IUser>) => Promise<IUser | null>
}

export interface IUserModel {
  documents: IUserRepository
  operations: IUserOperations
}
