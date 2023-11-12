import { IBaseSchema } from './base'

export interface ITask extends IBaseSchema {
  title: string
  description?: string | null
  isDone?: boolean
  user_id: string
}

export type ITaskParams = Omit<ITask, 'id'>

export type ITaskConcreteParams = Omit<ITask, 'id' | 'isDone'>

export type ITaskNonRelationalData = Omit<ITask, 'id' | 'user_id'>
