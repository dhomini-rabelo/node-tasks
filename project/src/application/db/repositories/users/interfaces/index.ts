import { IUser, IUserCleanParams, IUserParams } from '../../../schemas/users'

export interface IUserOperations {
  create: (data: IUserParams) => Promise<IUser>
  createMany: (dataSet: IUserParams[]) => Promise<IUser[]>
}

export interface IUserRepository {
  all: () => Promise<IUser[]>
  find: (params: Partial<IUserCleanParams>) => Promise<IUser[]>
  findOne: (params: Partial<IUserCleanParams>) => Promise<IUser | null>
}

export interface IUserModel {
  documents: IUserRepository
  operations: IUserOperations
}
