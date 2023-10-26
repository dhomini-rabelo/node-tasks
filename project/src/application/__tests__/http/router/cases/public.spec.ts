import express, { Request, Response } from 'express'
import supertest from 'supertest'
import { PublicRouter } from '../../../../http/router/cases/public'
import { randomUUID } from 'crypto'

describe('PublicRouter', () => {
  const middlewareResponse = { status: 503, payload: { test: 'test' } }
  const middleware = (req: Request, res: Response) => {
    return res
      .status(middlewareResponse.status)
      .json(middlewareResponse.payload)
  }

  it('should register a route with GET method', async () => {
    const router = new PublicRouter()
    const app = express()
    const randomPath = `/removeMiddleware/${randomUUID()}`

    class Controller {
      @router.get(randomPath)
      async route(req: Request, res: Response) {
        return res.status(200).send()
      }
    }

    app.use('/', router.router)

    const response = await supertest(app).get(randomPath).send()

    expect(response.status).toBe(200)
  })

  it('should register a route with POST method', async () => {
    const router = new PublicRouter()
    const app = express()
    const randomPath = `/removeMiddleware/${randomUUID()}`

    class Controller {
      @router.post(randomPath)
      async route(req: Request, res: Response) {
        return res.status(200).send()
      }
    }

    app.use('/', router.router)

    const response = await supertest(app).post(randomPath).send()

    expect(response.status).toBe(200)
  })

  it('should send the request to the next middleware when throw error', async () => {
    const router = new PublicRouter()
    const app = express()
    const randomPath = `/removeMiddleware/${randomUUID()}`

    class Controller {
      @router.get(randomPath)
      async index() {
        throw new Error('test')
      }

      @router.post(randomPath)
      async store() {
        throw new Error('test')
      }
    }

    app.use(middleware)
    app.use('/', router.router)

    const getResponse = await supertest(app).get(randomPath).send()
    const postResponse = await supertest(app).post(randomPath).send()

    expect(getResponse.status).toBe(middlewareResponse.status)
    expect(postResponse.status).toBe(middlewareResponse.status)
  })
})
