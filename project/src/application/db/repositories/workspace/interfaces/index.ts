import { IWorkspace, IWorkspaceParams } from '../../../schemas/workspace'

export interface IWorkspaceOperations {
  create: (data: IWorkspaceParams) => Promise<IWorkspace>
  createMany: (dataSet: IWorkspaceParams[]) => Promise<IWorkspace[]>
}

export interface IWorkspaceRepository {
  all: () => Promise<IWorkspace[]>
  find: (params: Partial<IWorkspaceParams>) => Promise<IWorkspace[]>
  findOne: (params: Partial<IWorkspaceParams>) => Promise<IWorkspace | null>
}

export interface IWorkspaceModel {
  documents: IWorkspaceRepository
  operations: IWorkspaceOperations
}
