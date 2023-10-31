import { IBaseSchema } from './base'

export interface IWorkspace extends IBaseSchema {
  title: string
  description: string
  user_id: string
}

export type IWorkspaceParams = Omit<IWorkspace, 'id'>
