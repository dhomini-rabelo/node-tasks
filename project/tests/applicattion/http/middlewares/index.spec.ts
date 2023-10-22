import { NextFunction, Request, Response } from 'express'
import supertest from 'supertest'
import { randomUUID } from 'crypto'
import { ValidationError } from '../../../../src/application/http/middlewares/error/exceptions/ValidationError'
import { errorMiddleware } from '../../../../src/application/http/middlewares/error'
import * as zod from 'zod'
import { ErrorMessages } from '../../../../src/application/http/error/messages'
import { removeMiddleware } from '../../../../src/application/utils/http/middleware'
import app from '../../../../src/core/app'

describe('errorMiddleware', () => {
  it('should throw ValidationError with status 400', async () => {
    expect(removeMiddleware(app, errorMiddleware)).toBeTruthy()
    const errorResponse = { errors: [] }
    const randomPath = `/error-middleware/${randomUUID()}`

    app.post(randomPath, (req: Request, res: Response, next: NextFunction) => {
      try {
        throw new ValidationError(errorResponse)
      } catch (err) {
        next(err)
      }
    })

    app.use(errorMiddleware)

    const response = await supertest(app).post(randomPath).send()

    expect(response.status).toBe(400)
    expect(response.body).toEqual(errorResponse)
  })

  it('should throw ZodError with status 400 and formatted response', async () => {
    expect(removeMiddleware(app, errorMiddleware)).toBeTruthy()
    const randomPath = `/error-middleware/${randomUUID()}`

    const schema = zod.object({
      name: zod.string({
        required_error: ErrorMessages.REQUIRED,
      }),
    })

    app.post(randomPath, (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({})
      } catch (err) {
        expect(err).instanceOf(zod.ZodError)
        next(err)
      }
    })

    app.use(errorMiddleware)

    const response = await supertest(app).post(randomPath).send()

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ name: [ErrorMessages.REQUIRED] })
  })
})
