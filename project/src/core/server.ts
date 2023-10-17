import express from 'express'
import { env } from './dependencies/env'
import mongoose from 'mongoose'
import { publicRouter } from './routes/routers'
import { errorMiddleware } from '../application/http/middlewares/error'
import './routes/routes'

const app = express()

app.use(express.json())

app.use('/', publicRouter.router)

app.use(errorMiddleware)

mongoose
  .connect(env.MONGO_URL, {})
  .then(() => {
    app.listen(env.PORT, () => {
      console.log('Server running')
    })
  })
  .catch((error) => {
    console.error('MongooseConnectionError: ', error)
  })
