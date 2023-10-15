import express from 'express'
import { env } from './env'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())

app.get('/', function (req, res) {
  return res.status(200).json({
    Hello: 'World',
  })
})

mongoose
  .connect(env.MONGO_URL, {})
  .then(() => {
    app.listen(env.PORT, () => {
      console.log('Server running')
    })
  })
  .catch((error) => {
    console.error('MongooseConnectionError', error)
  })
