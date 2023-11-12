import { ResourceNotFound } from '@/application/db/errors/ResourceNotFound'
import { TaskModel } from '../../../../models/mongoose/tasks'
import { ITask } from '../../../../schemas/tasks'
import { ITaskRepository } from '../../interfaces'
import { TaskDataAdapter } from './utils/adapter'
import { ManyResourcesFound } from '@/application/db/errors/ManyResourcesFound'

export class MongooseTaskRepository implements ITaskRepository {
  private adapter = new TaskDataAdapter()

  async all() {
    return this.adapter.formatAll(await TaskModel.find())
  }

  async find(params: Partial<ITask>) {
    return this.adapter.formatAll(
      await TaskModel.find(this.adapter.query(params)),
    )
  }

  async findOne(params: Partial<ITask>) {
    const task = await TaskModel.findOne(this.adapter.query(params))
    return task ? this.adapter.format(task) : null
  }

  async get(params: Partial<ITask>) {
    const tasks = await TaskModel.find(this.adapter.query(params))

    if (tasks.length === 0) {
      throw new ResourceNotFound()
    } else if (tasks.length > 1) {
      throw new ManyResourcesFound()
    }

    return this.adapter.format(tasks[0])
  }
}
