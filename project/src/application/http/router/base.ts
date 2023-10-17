import { Request, Response, NextFunction } from 'express'

export type IRoute = (req: Request, res: Response, next: NextFunction) => any

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
