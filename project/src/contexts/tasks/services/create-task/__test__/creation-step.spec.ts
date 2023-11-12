import { some } from '@tests/utils/some'
import { TaskModelSchema } from '@/core/__tests__/db/tasks/_index'
import { IUser } from '@/application/db/schemas/users'
import { createUser } from '@tests/factories/users'
import '@tests/setup/mongoose'
import { CreationStep } from '../creation-step'

describe('CreationStep for CreateTaskService', () => {
  const sut = new CreationStep()
  let user: IUser

  beforeAll(async () => {
    user = await createUser()
  })

  it('should return a valid task data with isDone equal to false', async () => {
    const response = await sut.run({
      user,
      data: {
        title: some.text(),
        description: some.text(),
      },
    })

    expect(response).toEqual(TaskModelSchema)
  })
})
