import { NextFunction, Request, Response } from 'express'
import { JWTModule } from '@/core/dependencies/modules'
import { UnauthorizedHttpError } from '../error/exceptions/HttpErrors/unauthorized'

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (typeof req.headers.authorization === 'string') {
    const [prefix, token] = req.headers.authorization.split(' ')
    if (JWTModule.prefixIsValid(prefix) && JWTModule.verifyToken(token || '')) {
      return next()
    }
  }
  throw new UnauthorizedHttpError('Credentials')
}
