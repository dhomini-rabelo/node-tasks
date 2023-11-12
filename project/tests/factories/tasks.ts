import {
  ITaskNonRelationalData,
  ITaskParams,
} from '../../src/application/db/schemas/tasks'
import { db } from '../../src/core/dependencies/db'
import { some } from '../utils/some'

interface ITaskInput extends Partial<ITaskNonRelationalData> {
  user_id: string
}

export function createTaskData(relationalData: {
  user_id: string
}): ITaskParams {
  return {
    title: some.text(),
    description: some.value(some.text(), null),
    isDone: some.boolean(),
    ...relationalData,
  }
}

export async function createTask({
  title = some.text(),
  description = some.value(some.text(), null),
  isDone = some.boolean(),
  user_id,
}: ITaskInput) {
  return db.Task.operations.create({
    title,
    description,
    isDone,
    user_id,
  })
}

export async function createTasks(quantity = 2, params: ITaskInput) {
  return db.Task.operations.createMany(
    Array.from({
      length: quantity,
    }).map((i) => ({
      title: `${params.title || some.text()}_${String(i)}`,
      description: some.value(
        `${params.description || some.text()}_${String(i)}`,
        null,
      ),
      isDone: some.boolean(),
      user_id: params.user_id,
    })),
  )
}
