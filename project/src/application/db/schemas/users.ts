import { IBaseSchema } from './base'

export interface IUser extends IBaseSchema {
  username: string
  password: string
}

export type IUserParams = Omit<IUser, '_id'>
