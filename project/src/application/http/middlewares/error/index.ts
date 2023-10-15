import { Request, Response, NextFunction } from 'express'
import { env } from '../../../../core/env'
import { ZodError } from 'zod'
import { formatZodError } from './format'

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const response: { status: number; payload: any } = {
    status: 500,
    payload: { message: 'Internal Server Error' },
  }
  if (env.NODE_ENV === 'development') {
    console.error(err)
  }
  if (err instanceof ZodError) {
    response.status = 400
    response.payload = formatZodError(err.format())
  }
  return res.status(response.status).json(response.payload)
}
