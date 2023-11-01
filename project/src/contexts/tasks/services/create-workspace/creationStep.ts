import {
  IWorkspace,
  IWorkspaceParams,
} from '@/application/db/schemas/workspace'
import { db } from '@/core/dependencies/db'

export class CreateWorkspaceStep {
  async run(validData: IWorkspaceParams): Promise<IWorkspace> {
    return db.Workspace.operations.create({
      ...validData,
    })
  }
}
