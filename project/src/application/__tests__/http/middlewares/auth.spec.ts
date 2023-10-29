import supertest from 'supertest'
import { HttpStatusCode } from '@/application/http/templates/status-code'
import express from 'express'
import { authMiddleware } from '@/application/http/middlewares/auth'
import { errorMiddleware } from '@/application/http/middlewares/error'
import { randomUUID } from 'crypto'
import { JWTModule } from '@/core/dependencies/modules'

describe('authMiddleware', () => {
  it('should return UNAUTHORIZED when credentials are not provided', async () => {
    const app = express()

    app.get('/migrations', authMiddleware, (req, res) => {
      return res.status(HttpStatusCode.OK).json([])
    })

    app.use(errorMiddleware)

    const response = await supertest(app).get('/migrations').send()

    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED)
    expect(response.body).toEqual({ message: 'Credentials not provided' })
  })

  it('should return UNAUTHORIZED for Invalid credentials', async () => {
    const app = express()

    app.get('/migrations', authMiddleware, (req, res) => {
      return res.status(HttpStatusCode.OK).json([])
    })

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
    const userId = randomUUID()
    const validToken = JWTModule.generateToken(userId)
    const validCredential = `${JWTModule.settings.prefix} ${validToken}`

    app.get('/migrations', authMiddleware, (req, res) => {
      return res.status(HttpStatusCode.OK).json([])
    })
    app.use(errorMiddleware)

    const response = await supertest(app)
      .get('/migrations')
      .set('Authorization', validCredential)
      .send()

    expect(response.status).toBe(HttpStatusCode.OK)
  })
})
