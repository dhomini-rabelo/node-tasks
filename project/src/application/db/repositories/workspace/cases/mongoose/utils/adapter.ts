import { IWorkspaceModel } from '@/application/db/models/mongoose/workspace'
import { IWorkspace } from '@/application/db/schemas/workspace'

export class WorkspaceDataAdapter {
  format(workspace: IWorkspaceModel): IWorkspace {
    const { _id, user_id, ...rest } = workspace.toJSON({
      versionKey: false,
    })

    return {
      id: String(_id),
      user_id: String(user_id),
      ...rest,
    }
  }

  formatAll(workspaces: IWorkspaceModel[]) {
    return workspaces.map((workspace) => this.format(workspace))
  }

  formatOrNull(workspace: IWorkspaceModel | null) {
    return workspace ? this.format(workspace) : null
  }
}
