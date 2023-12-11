import { createTasks } from '@tests/factories/tasks'
import { ListTaskService } from './index'
import { createUser } from '@tests/factories/users'
import '@tests/setup/mongoose'

describe('ListTaskService', () => {
  const sut = new ListTaskService()

  it('should return a list of tasks from user', async () => {
    const user = await createUser()
    const otherUser = await createUser()
    const tasksFromUser = await createTasks(2, { user_id: user.id })
    await createTasks(2, {
      user_id: otherUser.id,
    })

    const response = await sut.run({
      user,
    })

    expect(response).toHaveLength(2)
    expect(response).toEqual(expect.arrayContaining(tasksFromUser))
  })
})
