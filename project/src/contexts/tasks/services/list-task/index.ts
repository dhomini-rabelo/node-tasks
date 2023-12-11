import { ITask } from '@/application/db/schemas/tasks'
import { db } from '@/core/dependencies/db'

export class ListTaskService {
  public async run(): Promise<ITask[]> {
    return db.Task.documents.all()
  }
}
