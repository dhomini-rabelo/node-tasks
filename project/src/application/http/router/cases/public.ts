import express from 'express'
import { BaseRouter } from '../base'

export class PublicRouter extends BaseRouter {
  public readonly router = express.Router()

  get(path: string) {
    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) => {
      this.router.get(path, ...this.middlewares, this.wrapper(descriptor.value))
    }
  }

  post(path: string) {
    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) => {
      this.router.post(
        path,
        ...this.middlewares,
        this.wrapper(descriptor.value),
      )
    }
  }
}
