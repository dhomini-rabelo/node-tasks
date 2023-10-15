import { Request, Response, NextFunction } from 'express'
import { IRoute } from './types'

export abstract class BaseRouter {
  wrapper(routeHandler: IRoute): IRoute {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        return routeHandler(req, res, next)
      } catch (error) {
        next(error)
      }
    }
  }
}
