import { IBaseSchema } from './base'

export interface IUser extends IBaseSchema {
  username: string
  password: string
}

export type IUserParams = Omit<IUser, 'id'>

export type IUserCleanParams = Omit<IUserParams, 'password'>
