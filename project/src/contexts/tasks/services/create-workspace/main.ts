import { IUser } from '@/application/db/schemas/users'
import { IWorkspaceParams } from '@/application/db/schemas/workspace'
import { CreateWorkspaceStep } from './creationStep'
import { ValidateWorkspaceDataStep } from './validationStep'

export class CreateWorkspaceService {
  private creationStep = new CreateWorkspaceStep()
  private validationStep = new ValidateWorkspaceDataStep()

  async run(params: { payload: Partial<IWorkspaceParams>; user: IUser }) {
    const validPayloadData = await this.validationStep.run(params)
    return this.creationStep.run({
      ...validPayloadData,
      user_id: params.user.id,
    })
  }
}
