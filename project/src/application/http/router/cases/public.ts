import express, { Request, Response, NextFunction } from 'express'
import { IRoute } from '../interface/types'

export class PublicRouter {
  public readonly router = express.Router()

  wrapper(routeHandler: IRoute): IRoute {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        return routeHandler(req, res, next)
      } catch (error) {
        next(error)
      }
    }
  }

  get(path: string) {
    console.log('a')
    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) => {
      console.log('b', path, descriptor.value)
      this.router.get(path, this.wrapper(descriptor.value))
    }
  }
}
