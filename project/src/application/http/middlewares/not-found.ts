import { Request, Response } from 'express'
import { HttpStatusCode } from '../templates/status-code'

export function notFoundMiddleware(req: Request, res: Response) {
  return res.status(HttpStatusCode.NOT_FOUND).send()
}
