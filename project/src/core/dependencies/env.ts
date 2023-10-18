import { z } from 'zod'
import { config } from 'dotenv'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.test.env' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  PORT: z.number().default(5001),
  MONGO_URL: z.string(),
  BASE_PATH: z.string(),
})

const schema = envSchema.safeParse(process.env)

if (schema.success === false) {
  console.error('Errors: ', schema.error.format())
  throw new Error(`Invalid environment variables!`)
}

export const env = schema.data
