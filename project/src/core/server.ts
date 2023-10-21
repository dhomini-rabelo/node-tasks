import app from './app'
import { env } from './dependencies/env'
import mongoose from 'mongoose'

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
