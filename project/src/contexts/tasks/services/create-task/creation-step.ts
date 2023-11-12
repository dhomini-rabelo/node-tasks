import { ITask } from '@/application/db/schemas/tasks'
import { ICreateTaskServiceRequest } from '.'
import { IValidationStepResponse } from './validation-step'

interface IRequest extends Omit<ICreateTaskServiceRequest, 'data'> {
  data: IValidationStepResponse
}

export class CreationStep {
  async run(request: IRequest): Promise<ITask> { }
}
