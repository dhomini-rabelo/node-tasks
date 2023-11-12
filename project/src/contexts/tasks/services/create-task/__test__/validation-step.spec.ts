import { some } from '@tests/utils/some'
import { ValidationStep } from '../validation-step'
import { TaskParamsModelSchema } from '@/core/__tests__/db/tasks/_index'
import { getFormattedZodError } from '@tests/utils/zod'
import { DynamicErrors, ErrorMessages } from '@/application/http/error/messages'
import { ZodError } from 'zod'
import { IUser } from '@/application/db/schemas/users'
import { createUser } from '@tests/factories/users'
import '@tests/setup/mongoose'
import { ValidationError } from '@/application/http/middlewares/error/exceptions/ValidationError'
import { createTask } from '@tests/factories/tasks'

describe('ValidationStep for CreateTaskService', () => {
  const sut = new ValidationStep()
  let user: IUser

  beforeAll(async () => {
    user = await createUser()
  })

  it('should return a valid task data with "isDone" equal to false', async () => {
    const response = await sut.run({
      title: some.text(),
      description: some.text(),
      user_id: user.id,
    })

    expect(response).toEqual({
      ...TaskParamsModelSchema,
      isDone: false,
    })
  })

  it('should throw ValidationError when data title field already exists', async () => {
    const createdTaskInTheDatabase = await createTask({ user_id: user.id })

    await expect(async () => {
      await sut.run({
        title: createdTaskInTheDatabase.title,
        description: some.text(),
        user_id: some.text(24),
      })
    }).rejects.toThrow(ValidationError)
  })

  it('should throw ZodError when data are invalid', async () => {
    await expect(async () => {
      await sut.run({
        // required fields not sent
      })
    }).rejects.toThrow(ZodError)
  })

  describe('ValidationStep.schema', () => {
    const schema = ValidationStep.schema

    it('should return a valid task data', () => {
      const data = {
        title: some.text(),
      }
      const formattedData = schema.parse(data)

      expect(formattedData).toEqual({
        ...data,
        description: null,
      })
    })

    it('should return a valid task data when description field is empty', () => {
      const data = {
        title: some.text(),
        description: '',
      }
      const formattedData = schema.parse(data)

      expect(formattedData).toEqual({
        ...data,
      })
    })

    it('should verify required errors', () => {
      const data = {}
      const errors = getFormattedZodError(schema, data)

      expect(errors).toEqual({
        title: [ErrorMessages.REQUIRED],
      })
    })

    it('should verify invalid-value errors', () => {
      const data = {
        title: 123,
        description: [],
      }
      const errors = getFormattedZodError(schema, data)

      expect(errors).toEqual({
        title: [ErrorMessages.INVALID_VALUE],
        description: [ErrorMessages.INVALID_VALUE],
      })
    })

    it('should verify min-length errors', () => {
      const data = { title: some.text(3 - 1), description: some.text() }
      const errors = getFormattedZodError(schema, data)
      expect(errors).toEqual({
        title: [DynamicErrors.minLength(3)],
      })
    })

    it('should verify max-length errors', () => {
      const data = { title: some.text(64 + 1), description: some.text() }
      const errors = getFormattedZodError(schema, data)
      expect(errors).toEqual({
        title: [DynamicErrors.maxLength(64)],
      })
    })
  })
})
