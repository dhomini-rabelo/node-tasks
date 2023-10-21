import express from 'express'
import { publicRouter } from './routes/routers'
import { errorMiddleware } from '../application/http/middlewares/error'
import './routes/routes'

const app = express()

app.use(express.json())

app.use('/', publicRouter.router)

app.use(errorMiddleware)

export default app
