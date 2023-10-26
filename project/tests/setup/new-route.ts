import { errorMiddleware } from '../../src/application/http/middlewares/error'
import { notFoundMiddleware } from '../../src/application/http/middlewares/not-found'
import { removeMiddleware } from '../../src/application/utils/http/middleware'
import app from '../../src/core/app'

beforeAll(() => {
  removeMiddleware(app, notFoundMiddleware)
  removeMiddleware(app, errorMiddleware)
})

afterAll(() => {
  app.use(notFoundMiddleware)
  app.use(errorMiddleware)
})
