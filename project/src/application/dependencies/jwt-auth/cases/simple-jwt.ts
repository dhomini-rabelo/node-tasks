import { IJWTModule } from '../contract'
import jwt from 'jsonwebtoken'

export type ISettings = {
  expiresIn: number
  SECRET_KEY: string
}

type ITokenBody = {
  userId: string
}

export class SimpleJWTModule implements IJWTModule {
  constructor(
    private settings: ISettings,
  ) { } // prettier-ignore

  generateToken(userId: string) {
    return jwt.sign({ userId }, this.settings.SECRET_KEY, {
      expiresIn: this.settings.expiresIn,
    })
  }

  verifyToken(token: string) {
    try {
      return !!jwt.verify(token, this.settings.SECRET_KEY)
    } catch {
      return false
    }
  }

  getUserId(token: string) {
    const tokenBody = jwt.verify(token, this.settings.SECRET_KEY) as ITokenBody
    return tokenBody.userId
  }
}
