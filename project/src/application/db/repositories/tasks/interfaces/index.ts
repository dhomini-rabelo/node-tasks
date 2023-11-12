import { ITask, ITaskParams } from '../../../schemas/tasks'

export interface ITaskOperations {
  create: (data: ITaskParams) => Promise<ITask>
  createMany: (dataSet: ITaskParams[]) => Promise<ITask[]>
}

export interface ITaskRepository {
  all: () => Promise<ITask[]>
  find: (params: Partial<ITask>) => Promise<ITask[]>
  findOne: (params: Partial<ITask>) => Promise<ITask | null>
  get: (params: Partial<ITask>) => Promise<ITask>
}

export interface ITaskModel {
  documents: ITaskRepository
  operations: ITaskOperations
}
