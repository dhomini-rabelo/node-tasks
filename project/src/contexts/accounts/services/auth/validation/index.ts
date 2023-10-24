import { IUserParams } from '@/application/db/schemas/users'
import { LoginSchema } from './schema'

export class ValidateUserDataService {
  run(inputData: IUserParams): IUserParams {
    return LoginSchema.parse(inputData)
  }
}
