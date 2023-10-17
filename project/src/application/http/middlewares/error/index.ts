import { Request, Response, NextFunction } from 'express'
import { env } from '../../../../core/dependencies/env'
import { ZodError } from 'zod'
import { formatZodError } from './format'
import { ValidationError } from './exceptions/ValidationError'

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
  } else if (err instanceof ValidationError) {
    response.status = 400
    response.payload = err.errors
  }
  return res.status(response.status).json(response.payload)
}
