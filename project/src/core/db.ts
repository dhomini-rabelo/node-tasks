import { MongooseUserRepository } from '../application/db/repositories/users/cases/mongoose'
import { IUserModel } from '../application/db/repositories/users/interface'

const userModel: IUserModel = {
  documents: new MongooseUserRepository(),
}

export const db = {
  User: userModel,
}
