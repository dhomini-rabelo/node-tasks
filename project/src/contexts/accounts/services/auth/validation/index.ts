import { IUserParams } from '@/application/db/schemas/users'
import { LoginSchema } from './schema'

export class ValidateUserDataStep {
  run(inputData: IUserParams): IUserParams {
    return LoginSchema.parse(inputData)
  }
}
