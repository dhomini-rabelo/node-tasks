import { MongooseUserOperations } from '../../application/db/repositories/users/cases/mongoose/operations'
import { MongooseUserRepository } from '../../application/db/repositories/users/cases/mongoose/repository'
import { IUserModel } from '../../application/db/repositories/users/interfaces'

const userModel: IUserModel = {
  documents: new MongooseUserRepository(),
  operations: new MongooseUserOperations(),
}

export const db = {
  User: userModel,
}
