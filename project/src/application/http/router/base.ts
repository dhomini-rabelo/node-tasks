import { Request, Response, NextFunction, RequestHandler } from 'express'

export type IRoute = (req: Request, res: Response, next: NextFunction) => any

export abstract class BaseRouter {
  protected middlewares: RequestHandler[] = []

  use(...middlewares: RequestHandler[]) {
    this.middlewares.push(...middlewares)
  }

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
