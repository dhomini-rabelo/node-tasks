import { Request, Response, NextFunction } from 'express'
import { IRoute } from './types'

export abstract class BaseRouter {
  wrapper(routeHandler: IRoute) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await routeHandler(req, res, next)
      } catch (error) {
        next(error)
      }
    }
  }
}
