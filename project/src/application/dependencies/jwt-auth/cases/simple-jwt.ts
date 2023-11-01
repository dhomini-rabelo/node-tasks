import jwt from 'jsonwebtoken'
import { IJWTModule, ISettings } from '../contract'

type ITokenSave = { userId: string }

export class SimpleJWTModule extends IJWTModule {
  clone(settings: Partial<ISettings>) {
    return new SimpleJWTModule({ ...this.settings, ...settings })
  }

  generateToken(userId: string) {
    return jwt.sign(this.saveToken(userId), this.settings.SECRET_KEY, {
      expiresIn: String(this.settings.expiresIn),
    })
  }

  private saveToken(userId: string): ITokenSave {
    return { userId }
  }

  getToken(token: string): string {
    const data = jwt.verify(token, this.settings.SECRET_KEY) as ITokenSave
    return data.userId
  }

  prefixIsValid(prefix: string) {
    return prefix === this.settings.prefix
  }

  verifyToken(token: string) {
    try {
      return !!jwt.verify(token, this.settings.SECRET_KEY)
    } catch {
      return false
    }
  }
}
