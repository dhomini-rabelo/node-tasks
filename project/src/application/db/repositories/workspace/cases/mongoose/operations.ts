import { WorkspaceModel } from '@/application/db/models/mongoose/workspace'
import { IWorkspaceParams } from '@/application/db/schemas/workspace'
import { IWorkspaceOperations } from '../../interfaces'
import { WorkspaceFormatter } from './utils/formatter'

export class MongooseWorkspaceOperations implements IWorkspaceOperations {
  private formatter = new WorkspaceFormatter()

  async create(data: IWorkspaceParams) {
    const newWorkspace = new WorkspaceModel(data)
    return this.formatter.format(await newWorkspace.save())
  }

  async createMany(dataSet: IWorkspaceParams[]) {
    return this.formatter.formatAll(await WorkspaceModel.insertMany(dataSet))
  }
}
