import { VerifyCredentialsService } from './verify-credentials'
import { IUserParams } from '@/application/db/schemas/users'
import { ValidateUserDataService } from './validation'
import { JWTModule } from '@/core/dependencies/modules'

export class GetTokenMediator {
  private validationService = new ValidateUserDataService()
  private verifyCredentialsService = new VerifyCredentialsService()

  async run(inputData: IUserParams): Promise<string> {
    const data = this.validationService.run(inputData)
    const user = await this.verifyCredentialsService.run(data)
    return JWTModule.generateToken(user.id)
  }
}
