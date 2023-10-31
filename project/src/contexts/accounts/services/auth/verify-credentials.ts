import { IUser, IUserParams } from '@/application/db/schemas/users'
import { ErrorMessages } from '@/application/http/error/messages'
import { UnauthorizedHttpError } from '@/application/http/middlewares/error/exceptions/HttpErrors/Unauthorized'
import { db } from '@/core/dependencies/db'
import { HashModule } from '@/core/dependencies/modules'

export class VerifyCredentialsStep {
  async run(data: IUserParams): Promise<IUser> {
    const user = await this.verifyUsernameAndGetUser(data.username)
    this.verifyPassword(user, data.password)
    return user
  }

  private async verifyUsernameAndGetUser(username: string): Promise<IUser> {
    const user = await db.User.documents.findOne({ username })
    if (!user) {
      this.handleInvalidCredencialError()
    }
    return user
  }

  private verifyPassword(user: IUser, password: string) {
    const isCorrect = HashModule.compare(password, user.password)
    if (!isCorrect) {
      this.handleInvalidCredencialError()
    }
  }

  private handleInvalidCredencialError(): never {
    throw new UnauthorizedHttpError(ErrorMessages.INVALID_CREDENTIALS)
  }
}
