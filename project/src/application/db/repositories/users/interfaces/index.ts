import { IUser, IUserParams, IUserSearch } from '../../../schemas/users'

export interface IUserOperations {
  create: (data: IUserParams) => Promise<IUser>
  createMany: (dataSet: IUserParams[]) => Promise<IUser[]>
}

export interface IUserRepository {
  all: () => Promise<IUser[]>
  find: (params: Partial<IUserSearch>) => Promise<IUser[]>
  findOne: (params: Partial<IUserSearch>) => Promise<IUser | null>
}

export interface IUserModel {
  documents: IUserRepository
  operations: IUserOperations
}
