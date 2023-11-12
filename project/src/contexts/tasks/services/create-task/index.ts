import { ITask } from '@/application/db/schemas/tasks'
import { ValidationStep } from './validation-step'
import { CreationStep } from './creation-step'
import { IUser } from '@/application/db/schemas/users'

export interface ICreateTaskServiceRequest {
  user: IUser
  data: Partial<{
    title: string
    description: string | null
  }>
}

export class CreateTaskService {
  private validationStep = new ValidationStep()
  private creationStep = new CreationStep()

  async run(request: ICreateTaskServiceRequest): Promise<ITask> {
    const validData = await this.validationStep.run(request)
    return this.creationStep.run({
      user: request.user,
      data: validData,
    })
  }
}
