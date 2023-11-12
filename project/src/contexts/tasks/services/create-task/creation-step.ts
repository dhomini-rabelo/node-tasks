import { ITask } from '@/application/db/schemas/tasks'
import { ICreateTaskServiceRequest } from '.'
import { IValidationStepResponse } from './validation-step'
import { db } from '@/core/dependencies/db'

interface IRequest extends Omit<ICreateTaskServiceRequest, 'data'> {
  data: IValidationStepResponse
}

export class CreationStep {
  async run(request: IRequest): Promise<ITask> {
    return db.Task.operations.create({
      title: request.data.title,
      description: request.data.description,
      user_id: request.user.id,
      isDone: false,
    })
  }
}
