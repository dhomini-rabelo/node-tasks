import { ITask, ITaskParams } from '@/application/db/schemas/tasks'

export class CreationStep {
  async run(data: ITaskParams): Promise<ITask> { }
}
