import { ITask, ITaskConcreteParams } from '@/application/db/schemas/tasks'
import { ValidationStep } from './validation-step'
import { CreationStep } from './creation-step'

export class CreateTaskService {
  private validationStep = new ValidationStep()
  private creationStep = new CreationStep()

  async run(data: Partial<ITaskConcreteParams>): Promise<ITask> {
    const validData = await this.validationStep.run(data)
    return this.creationStep.run(validData)
  }
}
