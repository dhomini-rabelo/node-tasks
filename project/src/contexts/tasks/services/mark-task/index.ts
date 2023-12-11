import { IUser } from '@/application/db/schemas/users'
import { db } from '@/core/dependencies/db'

interface IRequest {
  id: string
  user: IUser
}

export class MarkTaskService {
  async run(request: IRequest): Promise<void> {
    const task = await db.Task.documents.get({
      id: request.id,
      user_id: request.user.id,
    })
    await db.Task.operations.save({ ...task, isDone: true })
  }
}
