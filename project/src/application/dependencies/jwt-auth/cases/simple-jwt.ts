import { IJWTModule, ISettings } from '../contract'
import jwt from 'jsonwebtoken'

export class SimpleJWTModule implements IJWTModule {
  constructor(
    public readonly settings: ISettings,
  ) { } // prettier-ignore

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
