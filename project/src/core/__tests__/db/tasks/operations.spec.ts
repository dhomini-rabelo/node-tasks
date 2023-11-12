import { db } from '../../../dependencies/db'
import { TaskModelSchema } from './_index'
import '../../../../../tests/setup/mongoose'
import { some } from '../../../../../tests/utils/some'
import { createUser } from '../../../../../tests/factories/users'
import { createTaskData } from '../../../../../tests/factories/tasks'
import { IUser } from '@/application/db/schemas/users'

describe('db.Task.operations', () => {
  const sut = db.Task.operations
  let user: IUser

  beforeAll(async () => {
    user = await createUser()
  })

  it('should create a task when all fields were submitted', async () => {
    const task = await sut.create({
      title: some.text(),
      user_id: user.id,
      description: some.text(),
      isDone: false,
    })
    expect(task).toEqual(TaskModelSchema)
  })

  it('should create a task when required fields were submitted', async () => {
    const task = await sut.create({
      title: some.text(),
      user_id: user.id,
    })
    expect(task).toEqual({
      ...TaskModelSchema,
      description: null,
      isDone: false,
    })
  })

  it('should throw an error when required fields were not submitted', async () => {
    await expect(async () => {
      // @ts-expect-error creating task without title
      await sut.create({
        user_id: user.id,
        description: some.text(),
        isDone: false,
      })
    }).rejects.toThrow()
    await expect(async () => {
      // @ts-expect-error creating task without user_id
      await sut.create({
        title: some.text(),
        description: some.text(),
        isDone: false,
      })
    }).rejects.toThrow()
  })

  it('should throw an error when title already exists', async () => {
    const createdTask = await sut.create({
      ...createTaskData({ user_id: user.id }),
    })
    await expect(async () => {
      await sut.create({
        ...createTaskData({ user_id: user.id }),
        title: createdTask.title,
      })
    }).rejects.toThrow()
  })

  it('should throw an error when title is too short', async () => {
    await expect(async () => {
      await sut.create({
        ...createTaskData({ user_id: user.id }),
        title: some.text(2),
      })
    }).rejects.toThrow()
  })

  it('should throw an error when title is too long', async () => {
    await expect(async () => {
      await sut.create({
        ...createTaskData({ user_id: user.id }),
        title: some.text(65),
      })
    }).rejects.toThrow()
  })
})
