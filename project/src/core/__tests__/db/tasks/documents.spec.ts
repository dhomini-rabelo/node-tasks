import { db } from '../../../dependencies/db'
import { createUser } from '../../../../../tests/factories/users'
import '../../../../../tests/setup/mongoose'
import { TaskModelSchema } from './_index'
import { createTask, createTasks } from '../../../../../tests/factories/tasks'
import { some } from '../../../../../tests/utils/some'
import { IUser } from '@/application/db/schemas/users'
import { ResourceNotFound } from '@/application/db/errors/ResourceNotFound'
import { ManyResourcesFound } from '@/application/db/errors/ManyResourcesFound'

describe('db.Task.documents', () => {
  const sut = db.Task.documents
  let user: IUser

  beforeAll(async () => {
    user = await createUser()
    await createTasks(3, { user_id: user.id })
  })

  it('should return all tasks', async () => {
    const query = await sut.all()
    expect(query.length).toBeGreaterThan(1)
    query.forEach((task) => {
      expect(task).toEqual(TaskModelSchema)
    })
  })

  it('should find task that title contains "a"', async () => {
    const query = await sut.find({
      title: 'a',
    })
    query.map((task) => expect(task.title).toEqual(expect.stringMatching(/a/)))
  })

  it('should return empty list when not found nothing', async () => {
    const query = await sut.find({
      title: 'inexistent-username',
    })
    expect(query).toStrictEqual([])
  })

  it('should find one user from title', async () => {
    const title = some.text()
    await createTask({ title, user_id: user.id })
    const task = await sut.get({
      title,
    })
    expect(task).toEqual(TaskModelSchema)
  })

  it('should return null when not found nothing', async () => {
    const task = await sut.findOne({
      title: 'non-existent-title',
    })
    expect(task).toBeNull()
  })

  it('should find only one user', async () => {
    const createdTaskInTheDatabase = await createTask({ user_id: user.id })
    const task = await sut.get({
      id: createdTaskInTheDatabase.id,
    })
    expect(task).toEqual(TaskModelSchema)
  })

  it('should throw ResourceNotFound when not found nothing', async () => {
    await expect(async () => {
      await sut.get({
        title: 'non-existent-title',
      })
    }).rejects.toThrow(ResourceNotFound)
  })

  it('should throw ManyResourcesFound when found many tasks', async () => {
    await createTasks(3, { user_id: user.id })
    await expect(async () => {
      await sut.get({
        user_id: user.id,
      })
    }).rejects.toThrow(ManyResourcesFound)
  })
})
