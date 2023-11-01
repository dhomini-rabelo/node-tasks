import { IUser } from '@/application/db/schemas/users'
import { db } from '@/core/dependencies/db'
import { JWTModule } from '@/core/dependencies/modules'
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedHttpError } from '../error/exceptions/HttpErrors/Unauthorized'

export interface AuthRequestInput extends Request {
  user?: IUser
}

export interface AuthRequestOutput extends Request {
  user: IUser
}

export async function authMiddleware(
  req: AuthRequestInput,
  res: Response,
  next: NextFunction,
) {
  if (typeof req.headers.authorization === 'string') {
    const [prefix, token] = req.headers.authorization.split(' ')
    if (JWTModule.prefixIsValid(prefix) && JWTModule.verifyToken(token || '')) {
      req.user = await db.User.documents.get({
        id: String(JWTModule.getToken(token)),
      })
      return next()
    }
    throw new UnauthorizedHttpError('Invalid credentials')
  }
  throw new UnauthorizedHttpError('Credentials not provided')
}
