import { createTasks } from '@tests/factories/tasks'
import { MarkTaskService } from './index'
import { createUser } from '@tests/factories/users'
import '@tests/setup/mongoose'
import { db } from '@/core/dependencies/db'

describe('MarkTaskService', () => {
  const sut = new MarkTaskService()

  it('should mark a task as done', async () => {
    const user = await createUser()
    const task = await createTasks(1, { user_id: user.id })

    await sut.run({ id: task[0].id })

    const updatedTask = await db.Task.documents.get({ id: task[0].id })
    expect(updatedTask.isDone).toBe(true)
  })
})
