import { ITask } from '@/application/db/schemas/tasks'
import { IUser } from '@/application/db/schemas/users'
import { db } from '@/core/dependencies/db'

interface IRequest {
  user: IUser
}

export class ListTaskService {
  public async run(request: IRequest): Promise<ITask[]> {
    return db.Task.documents.find({
      user_id: request.user.id,
    })
  }
}
