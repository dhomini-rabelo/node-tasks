import { createTasks } from '@tests/factories/tasks'
import { ListTaskService } from './index'
import { createUser } from '@tests/factories/users'
import '@tests/setup/mongoose'

describe('ListTaskService', () => {
  const sut = new ListTaskService()

  it('should return a list of tasks', async () => {
    const user = await createUser()
    const tasks = await createTasks(2, { user_id: user.id })

    const response = await sut.execute()

    expect(response).toEqual(expect.arrayContaining(tasks))
  })
})
