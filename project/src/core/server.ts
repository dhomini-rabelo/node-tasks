import express from 'express'
import { env } from './env'
import mongoose from 'mongoose'
import { publicRouter } from './router'
import './routes'

const app = express()

app.use(express.json())

app.use('/', publicRouter.router)

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
