import { MongooseWorkspaceOperations } from '@/application/db/repositories/workspace/cases/mongoose/operations'
import { MongooseWorkspaceRepository } from '@/application/db/repositories/workspace/cases/mongoose/repository'
import { IWorkspaceModel } from '@/application/db/repositories/workspace/interfaces'
import { MongooseUserOperations } from '../../application/db/repositories/users/cases/mongoose/operations'
import { MongooseUserRepository } from '../../application/db/repositories/users/cases/mongoose/repository'
import { IUserModel } from '../../application/db/repositories/users/interfaces'

const userModel: IUserModel = {
  documents: new MongooseUserRepository(),
  operations: new MongooseUserOperations(),
}

const workspaceModel: IWorkspaceModel = {
  documents: new MongooseWorkspaceRepository(),
  operations: new MongooseWorkspaceOperations(),
}

export const db = {
  User: userModel,
  Workspace: workspaceModel,
}
