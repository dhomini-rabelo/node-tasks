import { IBaseSchema } from './base'

export interface IUser extends IBaseSchema {
  username: string
  password: string
}
