import { Request, Response, NextFunction } from 'express'
import { env } from '../../../core/env'

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (env.NODE_ENV === 'development') {
    console.error(err)
  }
  return res.status(500).json({ message: 'Internal Server Error' })
}
