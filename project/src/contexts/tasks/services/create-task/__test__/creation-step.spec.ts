import { some } from '@tests/utils/some'
import { TaskModelSchema } from '@/core/__tests__/db/tasks/_index'
import { IUser } from '@/application/db/schemas/users'
import { createUser } from '@tests/factories/users'
import '@tests/setup/mongoose'
import { CreationStep } from '../creation-step'
import { db } from '@/core/dependencies/db'

describe('CreationStep for CreateTaskService', () => {
  const sut = new CreationStep()
  let user: IUser

  beforeAll(async () => {
    user = await createUser()
  })

  it('should return a valid task data', async () => {
    const response = await sut.run({
      user,
      data: {
        title: some.text(),
        description: some.text(),
      },
    })

    expect(response).toEqual({
      ...TaskModelSchema,
      isDone: false,
    })
  })

  it('should save a task in the database with isDone equal to false', async () => {
    const response = await sut.run({
      user,
      data: {
        title: some.text(),
        description: some.text(),
      },
    })

    const savedTask = await db.Task.documents.findOne({ id: response.id })

    expect(savedTask).toEqual({
      ...TaskModelSchema,
      isDone: false,
    })
  })
})
