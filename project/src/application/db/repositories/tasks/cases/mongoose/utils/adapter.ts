import { ITaskModel } from '@/application/db/models/mongoose/tasks'
import { ITask } from '@/application/db/schemas/tasks'
import { removeUndefinedKeys } from '@/application/utils/generic'

export class TaskDataAdapter {
  format(task: ITaskModel): ITask {
    const { _id, user_id, ...rest } = task.toJSON({
      versionKey: false,
    })

    return {
      id: String(_id),
      user_id: String(user_id),
      ...rest,
    }
  }

  formatAll(tasks: ITaskModel[]) {
    return tasks.map((task) => this.format(task))
  }

  query(task: Partial<ITask>) {
    const { id, ...rest } = task
    return removeUndefinedKeys({
      _id: id,
      ...rest,
    })
  }
}
