import * as zod from 'zod'
import { ErrorMessages } from '../../../http/error/messages'
import { formatZodError } from '../../../http/middlewares/error/format'

const testSchema = zod.object({
  field: zod.string({
    required_error: ErrorMessages.REQUIRED,
  }),
})

describe('formatZodError', () => {
  it('should return invalid body error', () => {
    const schema = testSchema.safeParse([])
    if (!schema.success) {
      const errors = formatZodError(schema.error.format())
      expect(errors.body).toEqual(['Expected object, received array'])
    } else {
      throw new Error('Unexpected success schema')
    }
  })
  it('should return field error in main object as string array', () => {
    const schema = testSchema.safeParse({})
    if (!schema.success) {
      const errors = formatZodError(schema.error.format())
      expect(errors.field).toEqual([ErrorMessages.REQUIRED])
    } else {
      throw new Error('Unexpected success schema')
    }
  })
})
