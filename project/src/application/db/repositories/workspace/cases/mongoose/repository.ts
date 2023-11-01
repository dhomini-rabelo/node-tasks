import { WorkspaceModel } from '@/application/db/models/mongoose/workspace'
import { IWorkspaceParams } from '@/application/db/schemas/workspace'
import { IWorkspaceRepository } from '../../interfaces'
import { WorkspaceFormatter } from './utils/formatter'

export class MongooseWorkspaceRepository implements IWorkspaceRepository {
  private formatter = new WorkspaceFormatter()

  async all() {
    return this.formatter.formatAll(await WorkspaceModel.find())
  }

  async find(params: Partial<IWorkspaceParams>) {
    return this.formatter.formatAll(await WorkspaceModel.find(params))
  }

  async findOne(params: Partial<IWorkspaceParams>) {
    return this.formatter.formatOrNull(await WorkspaceModel.findOne(params))
  }
}
