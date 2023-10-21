import { IUser } from '../../../../../application/db/schemas/users'
import { CreateUserService } from './creation'
import { IRegisterUserParams, ValidateUserDataService } from './validation'

export class CreateUserMediator {
  private validateService = new ValidateUserDataService()
  private createUserService = new CreateUserService()

  async run(data: IRegisterUserParams): Promise<IUser> {
    const validData = await this.validateService.run(data)
    return this.createUserService.run(validData)
  }
}
