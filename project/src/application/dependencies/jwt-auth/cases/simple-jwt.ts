import { IJWTModule } from '../contract'
import jwt from 'jsonwebtoken'

export type ISettings = {
  expiresIn: number
  SECRET_KEY: string
}

export class SimpleJWTModule implements IJWTModule {
  constructor(
    private settings: ISettings,
  ) { } // prettier-ignore

  generateToken(userId: string) {
    return jwt.sign({ userId }, this.settings.SECRET_KEY, {
      expiresIn: 30,
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
