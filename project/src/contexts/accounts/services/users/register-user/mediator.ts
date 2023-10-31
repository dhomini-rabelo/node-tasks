import { IUser } from '../../../../../application/db/schemas/users'
import { CreateUserStep } from './creation'
import { IRegisterUserParams, ValidateUserDataStep } from './validation'

export class CreateUserService {
  private validateStep = new ValidateUserDataStep()
  private createUserStep = new CreateUserStep()

  async run(data: IRegisterUserParams): Promise<IUser> {
    const validData = await this.validateStep.run(data)
    return this.createUserStep.run(validData)
  }
}
