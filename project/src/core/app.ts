import express from 'express'
import { publicRouter } from './routes/routers'
import { errorMiddleware } from '../application/http/middlewares/error'
import './routes/routes'
import { notFoundMiddleware } from '../application/http/middlewares/not-found'

const app = express()

app.use(express.json())

app.use('/', publicRouter.router)

app.use(notFoundMiddleware)

app.use(errorMiddleware)

export default app
