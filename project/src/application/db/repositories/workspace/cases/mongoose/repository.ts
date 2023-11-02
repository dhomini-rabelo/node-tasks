import { WorkspaceModel } from '@/application/db/models/mongoose/workspace'
import { IWorkspaceParams } from '@/application/db/schemas/workspace'
import { IWorkspaceRepository } from '../../interfaces'
import { WorkspaceDataAdapter } from './utils/adapter'

export class MongooseWorkspaceRepository implements IWorkspaceRepository {
  private adapter = new WorkspaceDataAdapter()

  async all() {
    return this.adapter.formatAll(await WorkspaceModel.find())
  }

  async find(params: Partial<IWorkspaceParams>) {
    return this.adapter.formatAll(await WorkspaceModel.find(params))
  }

  async findOne(params: Partial<IWorkspaceParams>) {
    return this.adapter.formatOrNull(await WorkspaceModel.findOne(params))
  }
}
