import { db } from '@/core/dependencies/db'

interface IRequest {
  id: string
}

export class MarkTaskService {
  async run(request: IRequest): Promise<void> {
    const task = await db.Task.documents.get({ id: request.id })
    await db.Task.operations.save({ ...task, isDone: true })
  }
}
