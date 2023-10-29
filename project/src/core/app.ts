import express from 'express'
import { errorMiddleware } from '../application/http/middlewares/error'
import { notFoundMiddleware } from '../application/http/middlewares/not-found'
import { authRouter, publicRouter } from './routes/routers'
import './routes/routes'

const app = express()

app.use(express.json())

app.use('/', publicRouter.router)

app.use('/', authRouter.router)

app.use(notFoundMiddleware)

app.use(errorMiddleware)

export default app
