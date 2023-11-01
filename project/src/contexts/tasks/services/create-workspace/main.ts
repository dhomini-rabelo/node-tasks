import { IUser } from '@/application/db/schemas/users'
import { IWorkspaceParams } from '@/application/db/schemas/workspace'
import { CreateWorkspaceStep } from './creationStep'
import { ValidateWorkspaceDataStep } from './validationStep'

export class CreateWorkspaceService {
  private creationStep = new CreateWorkspaceStep()
  private validationStep = new ValidateWorkspaceDataStep()

  run(data: { payload: Partial<IWorkspaceParams>; user: IUser }) { }
}
