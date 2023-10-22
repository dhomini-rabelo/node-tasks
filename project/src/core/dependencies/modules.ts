import { BCryptHashModule } from '../../application/dependencies/hash/cases/bcrypt'
import { IHashModule } from '../../application/dependencies/hash/contract'
import { SimpleJWTModule } from '../../application/dependencies/jwt-auth/cases/simple-jwt'
import { IJWTModule } from '../../application/dependencies/jwt-auth/contract'
import { env } from './env'

export const HashModule: IHashModule = new BCryptHashModule()
export const JWTModule: IJWTModule = new SimpleJWTModule({
  SECRET_KEY: env.SECRET_KEY,
  expiresIn: 60 * 60 * 2, // 2 hours
})
