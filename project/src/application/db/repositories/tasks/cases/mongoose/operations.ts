import { TaskModel } from '../../../../models/mongoose/tasks'
import { ITaskParams } from '../../../../schemas/tasks'
import { ITaskOperations } from '../../interfaces'
import { TaskDataAdapter } from './utils/adapter'

export class MongooseTaskOperations implements ITaskOperations {
  private adapter = new TaskDataAdapter()

  async create(data: ITaskParams) {
    const newTask = new TaskModel(data)
    return this.adapter.format(await newTask.save())
  }

  async createMany(dataSet: ITaskParams[]) {
    return this.adapter.formatAll(await TaskModel.insertMany(dataSet))
  }
}
