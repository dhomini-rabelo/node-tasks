import { Request, Response } from 'express'

export function notFoundMiddleware(req: Request, res: Response) {
  return res.status(404).send()
}
