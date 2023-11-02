import { WorkspaceModel } from '@/application/db/models/mongoose/workspace'
import { IWorkspaceParams } from '@/application/db/schemas/workspace'
import { IWorkspaceOperations } from '../../interfaces'
import { WorkspaceDataAdapter } from './utils/adapter'

export class MongooseWorkspaceOperations implements IWorkspaceOperations {
  private adapter = new WorkspaceDataAdapter()

  async create(data: IWorkspaceParams) {
    const newWorkspace = new WorkspaceModel(data)
    return this.adapter.format(await newWorkspace.save())
  }

  async createMany(dataSet: IWorkspaceParams[]) {
    return this.adapter.formatAll(await WorkspaceModel.insertMany(dataSet))
  }
}
