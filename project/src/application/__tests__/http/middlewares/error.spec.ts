import { ErrorMessages } from '@/application/http/error/messages'
import { errorMiddleware } from '@/application/http/middlewares/error'
import { ForbiddenHttpError } from '@/application/http/middlewares/error/exceptions/HttpErrors/Forbidden'
import { ValidationError } from '@/application/http/middlewares/error/exceptions/ValidationError'
import { HttpStatusCode } from '@/application/http/templates/status-code'
import { randomUUID } from 'crypto'
import express from 'express'
import supertest from 'supertest'
import * as zod from 'zod'

describe('errorMiddleware', () => {
  it('should return API response when exception is not thrown', async () => {
    const app = express()
    const randomPath = `/public-router/${randomUUID()}`

    app.get(randomPath, (req, res) => {
      return res.status(200).send()
    })

    app.use(errorMiddleware)

    const response = await supertest(app).get(randomPath).send()
    expect(response.status).toBe(HttpStatusCode.OK)
  })

  it('should return HttpError response when any BaseHttpError is thrown', async () => {
    const errorMessage = 'some error message'
    const app = express()
    const randomPath = `/public-router/${randomUUID()}`

    app.get(randomPath, () => {
      throw new ForbiddenHttpError(errorMessage)
    })

    app.use(errorMiddleware)

    const response = await supertest(app).get(randomPath).send()

    expect(response.status).toBe(HttpStatusCode.FORBIDDEN)
    expect(response.body).toEqual({ message: errorMessage })
  })

  it('should return BadRequest response when any ValidationError is thrown', async () => {
    const app = express()
    const randomPath = `/public-router/${randomUUID()}`

    app.post(randomPath, () => {
      throw new ValidationError({
        field: [ErrorMessages.REQUIRED],
      })
    })

    app.use(errorMiddleware)

    const response = await supertest(app).post(randomPath).send()

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST)
    expect(response.body).toEqual({ field: [ErrorMessages.REQUIRED] })
  })

  it('should return BadRequest response when any ZodError is thrown', async () => {
    const app = express()
    const randomPath = `/public-router/${randomUUID()}`

    const testSchema = zod.object({
      field: zod.string({
        required_error: ErrorMessages.REQUIRED,
      }),
    })

    app.post(randomPath, () => {
      testSchema.parse({}) // throw ZodError
    })

    app.use(errorMiddleware)

    const response = await supertest(app).post(randomPath).send()

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST)
    expect(response.body).toEqual({ field: [ErrorMessages.REQUIRED] })
  })
})
