import { IJWTModule, ISettings } from '../contract'
import jwt from 'jsonwebtoken'

export class SimpleJWTModule extends IJWTModule {
  prefixIsValid(prefix: string) {
    return prefix === this.settings.prefix
  }

  clone(settings: Partial<ISettings>) {
    return new SimpleJWTModule({ ...this.settings, ...settings })
  }

  generateToken(userId: string) {
    return jwt.sign({ userId }, this.settings.SECRET_KEY, {
      expiresIn: String(this.settings.expiresIn),
    })
  }

  verifyToken(token: string) {
    try {
      return !!jwt.verify(token, this.settings.SECRET_KEY)
    } catch {
      return false
    }
  }
}
