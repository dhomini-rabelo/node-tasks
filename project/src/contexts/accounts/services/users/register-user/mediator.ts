import { IUser, IUserParams } from '../../../../../application/db/schemas/users'
import { CreateUserService } from './creation'
import { ValidateUserDataService } from './validation'

export class CreateUserMediator {
  private validateService = new ValidateUserDataService()
  private createUserService = new CreateUserService()

  async run(data: IUserParams): Promise<IUser> {
    const validData = await this.validateService.run(data)
    return this.createUserService.run(validData)
  }
}
