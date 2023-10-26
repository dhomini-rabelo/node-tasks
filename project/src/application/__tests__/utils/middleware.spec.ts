import express, { NextFunction, Request, Response } from 'express'
import supertest from 'supertest'
import { randomUUID } from 'crypto'
import { removeMiddleware } from '../../utils/http/middleware'

describe('middleware functions', () => {
  describe('removeMiddleware', () => {
    const middlewareResponse = { status: 503, payload: { test: 'test' } }
    const middleware = (req: Request, res: Response) => {
      return res
        .status(middlewareResponse.status)
        .json(middlewareResponse.payload)
    }
    const serverErrorResponse = { status: 500 }

    it('should ensure that the middleware is working', async () => {
      const app = express()
      const randomPath = `/removeMiddleware/${randomUUID()}`

      app.use(middleware)

      app.post(
        randomPath,
        (req: Request, res: Response, next: NextFunction) => {
          try {
            throw new Error('test')
          } catch (err) {
            next(err)
          }
        },
      )

      const response = await supertest(app).post(randomPath).send()

      expect(response.status).toBe(middlewareResponse.status)
      expect(middlewareResponse.status).not.toBe(serverErrorResponse.status)
    })

    it('should remove the middleware and return true', async () => {
      const app = express()
      const randomPath = `/removeMiddleware/${randomUUID()}`

      app.post(
        randomPath,
        (req: Request, res: Response, next: NextFunction) => {
          try {
            throw new Error('test')
          } catch (err) {
            next(err)
          }
        },
      )

      app.use(middleware)

      expect(removeMiddleware(app, middleware)).toBeTruthy()

      const response = await supertest(app).post(randomPath).send()

      expect(response.status).toBe(serverErrorResponse.status)
      expect(middlewareResponse.status).not.toBe(serverErrorResponse.status)
    })

    it('should return false when middleware is not registered', async () => {
      const app = express()
      const randomPath = `/removeMiddleware/${randomUUID()}`

      app.post(
        randomPath,
        (req: Request, res: Response, next: NextFunction) => {
          try {
            throw new Error('test')
          } catch (err) {
            next(err)
          }
        },
      )

      // app.use(middleware)

      expect(removeMiddleware(app, middleware)).toBeFalsy()

      const response = await supertest(app).post(randomPath).send()

      expect(response.status).toBe(serverErrorResponse.status)
      expect(middlewareResponse.status).not.toBe(serverErrorResponse.status)
    })
  })
})
