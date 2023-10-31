import { IBaseSchema } from './base'

export interface IWorkspace extends IBaseSchema {
  title: string
  description: string
}

export type IWorkspaceParams = Omit<IWorkspace, 'id'>
