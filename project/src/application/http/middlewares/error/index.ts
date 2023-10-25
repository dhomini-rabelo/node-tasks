import { Request, Response, NextFunction } from 'express'
import { env } from '../../../../core/dependencies/env'
import { ZodError } from 'zod'
import { formatZodError } from './format'
import { ValidationError } from './exceptions/ValidationError'
import { BaseHttpError } from './exceptions/HttpErrors/base'
import { HttpStatusCode } from '../../templates/status-code'

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const response: { status: number; payload: any } = {
    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    payload: { message: 'Internal Server Error' },
  }
  if (env.NODE_ENV === 'development') {
    console.error(err)
  }
  if (err instanceof ZodError) {
    response.status = HttpStatusCode.BAD_REQUEST
    response.payload = formatZodError(err.format())
  } else if (err instanceof ValidationError) {
    response.status = HttpStatusCode.BAD_REQUEST
    response.payload = err.errors
  } else if (err instanceof BaseHttpError) {
    response.status = err.status
    response.payload = err.payload
  }
  return res.status(response.status).json(response.payload)
}
