import { IUserParams } from '@/application/db/schemas/users'
import { JWTModule } from '@/core/dependencies/modules'
import { ValidateUserDataStep } from './validation'
import { VerifyCredentialsStep } from './verify-credentials'

export class GetTokenService {
  private validationStep = new ValidateUserDataStep()
  private verifyCredentialsStep = new VerifyCredentialsStep()

  async run(inputData: IUserParams): Promise<string> {
    const data = this.validationStep.run(inputData)
    const user = await this.verifyCredentialsStep.run(data)
    return JWTModule.generateToken(user.id)
  }
}
