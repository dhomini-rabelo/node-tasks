import { createTask } from '@tests/factories/tasks'
import { MarkTaskService } from './index'
import { createUser } from '@tests/factories/users'
import '@tests/setup/mongoose'
import { db } from '@/core/dependencies/db'

describe('MarkTaskService', () => {
  const sut = new MarkTaskService()

  it('should mark a task as done', async () => {
    const user = await createUser()
    const task = await createTask({ user_id: user.id, isDone: false })

    await sut.run({
      id: task.id,
      user,
    })

    const updatedTask = await db.Task.documents.get({ id: task.id })
    expect(updatedTask.isDone).toBe(true)
  })

  it('should throw when task does not exists', async () => {
    const user = await createUser()

    const responsePromise = sut.run({
      id: 'invalid_id',
      user,
    })

    await expect(responsePromise).rejects.toThrow()
  })

  it('should throw when other user tries to mark a task', async () => {
    const user = await createUser()
    const otherUser = await createUser()
    const task = await createTask({ user_id: user.id })

    const responsePromise = sut.run({
      id: task.id,
      user: otherUser,
    })

    await expect(responsePromise).rejects.toThrow()
  })
})
