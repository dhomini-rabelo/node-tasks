import { formatZodError } from '../../application/http/middlewares/error/format'
import { ZodType } from 'zod'

export function getFormattedZodError<ISchema extends ZodType>(
  schemaObject: ISchema,
  data: Record<string, any>,
) {
  const schema = schemaObject.safeParse(data)
  if (!schema.success) {
    return formatZodError(schema.error.format())
  }
  throw new Error('Unexpected valid schema')
}

export function getZodSuccess<ISchema extends ZodType>(
  schemaObject: ISchema,
  data: Record<string, any>,
) {
  const schema = schemaObject.safeParse(data)
  if (schema.success) {
    return schema.data
  }
  throw new Error('Unexpected invalid schema')
}
