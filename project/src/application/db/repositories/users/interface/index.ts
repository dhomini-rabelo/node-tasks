import { IUser } from '../../../schemas/users'

export interface IUserOperations {
  create: (data: Omit<IUser, '_id'>) => Promise<IUser>
}

export interface IUserRepository {
  all: () => Promise<IUser[]>
}

export interface IUserModel {
  documents: IUserRepository
  operations: IUserOperations
}
