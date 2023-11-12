import supertest from 'supertest'
import { HttpStatusCode } from '@/application/http/templates/status-code'
import express from 'express'
import { authMiddleware } from '@/application/http/middlewares/auth'
import { errorMiddleware } from '@/application/http/middlewares/error'
import { JWTModule } from '@/core/dependencies/modules'
import { createUser } from '../../../../../tests/factories/users'
import '../../../../../tests/setup/mongoose'

describe('authMiddleware', () => {
  it('should return UNAUTHORIZED when credentials are not provided', async () => {
    const app = express()

    app.get(
      '/migrations',
      async (req, res, next) => {
        try {
          await authMiddleware(req, res, next)
        } catch (error) {
          next(error)
        }
      },
      (req, res, next) => {
        try {
          return res.status(HttpStatusCode.OK).json([])
        } catch {
          next()
        }
      },
    )

    app.use(errorMiddleware)

    const response = await supertest(app).get('/migrations').send()

    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED)
    expect(response.body).toEqual({ message: 'Credentials not provided' })
  })

  it('should return UNAUTHORIZED for Invalid credentials', async () => {
    const app = express()

    app.get(
      '/migrations',
      async (req, res, next) => {
        try {
          await authMiddleware(req, res, next)
        } catch (error) {
          next(error)
        }
      },
      (req, res) => {
        return res.status(HttpStatusCode.OK).json([])
      },
    )

    app.use(errorMiddleware)

    const response = await supertest(app)
      .get('/migrations')
      .set('Authorization', 'invalid-credential')
      .send()

    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED)
    expect(response.body).toEqual({ message: 'Invalid credentials' })
  })

  it('should return API response for valid credentials', async () => {
    const app = express()
    const user = await createUser()
    const validToken = JWTModule.generateToken(user.id)
    const validCredential = `${JWTModule.settings.prefix} ${validToken}`

    app.get(
      '/migrations',
      async (req, res, next) => {
        try {
          await authMiddleware(req, res, next)
        } catch (error) {
          next(error)
        }
      },
      (req, res) => {
        return res.status(HttpStatusCode.OK).json([])
      },
    )

    app.use(errorMiddleware)

    const response = await supertest(app)
      .get('/migrations')
      .set('Authorization', validCredential)
      .send()

    expect(response.status).toBe(HttpStatusCode.OK)
  })
})
