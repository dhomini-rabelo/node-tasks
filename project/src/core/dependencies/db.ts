import { ITaskModel } from '@/application/db/repositories/tasks/interfaces'
import { MongooseUserOperations } from '../../application/db/repositories/users/cases/mongoose/operations'
import { MongooseUserRepository } from '../../application/db/repositories/users/cases/mongoose/repository'
import { IUserModel } from '../../application/db/repositories/users/interfaces'
import { MongooseTaskRepository } from '@/application/db/repositories/tasks/cases/mongoose/repository'
import { MongooseTaskOperations } from '@/application/db/repositories/tasks/cases/mongoose/operations'

const userModel: IUserModel = {
  documents: new MongooseUserRepository(),
  operations: new MongooseUserOperations(),
}

const taskModel: ITaskModel = {
  documents: new MongooseTaskRepository(),
  operations: new MongooseTaskOperations(),
}

export const db = {
  User: userModel,
  Task: taskModel,
}
