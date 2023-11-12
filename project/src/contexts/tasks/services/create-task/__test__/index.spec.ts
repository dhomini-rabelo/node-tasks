import { IUser } from '@/application/db/schemas/users'
import { CreateTaskService } from '..'
import { createTaskData } from '../../../../../../tests/factories/tasks'
import { createUser } from '../../../../../../tests/factories/users'
import '@tests/setup/mongoose'
import { ValidationStep } from '../validation-step'
import { randomUUID } from 'crypto'
import { CreationStep } from '../creation-step'
import { Mock } from 'vitest'

vi.mock('@/contexts/tasks/services/create-task/validation-step', () => {
  return {
    ValidationStep: vi.fn(() => ({
      run: vi.fn((data) => ({
        ...data,
        title: randomUUID(),
      })),
    })),
  }
})

vi.mock('@/contexts/tasks/services/create-task/creation-step', () => {
  return {
    CreationStep: vi.fn(() => ({
      run: vi.fn((data) => ({
        ...data,
        id: randomUUID(),
      })),
    })),
  }
})

// eslint-disable-next-line
// @ts-expect-error
const validationStep = ValidationStep as Mock
const creationStep = CreationStep as Mock

describe('CreateTaskService', () => {
  const sut = new CreateTaskService()
  let user: IUser

  beforeAll(async () => {
    user = await createUser()
  })

  it('should call ValidationStep', async () => {
    await sut.run({
      user,
      data: {
        ...createTaskData({ user_id: user.id }),
      },
    })

    expect(validationStep.mock).not.toBeUndefined()
    expect(validationStep.mock.results[0].value.run).toHaveBeenCalled()
  })

  it('should call CreationStep and returns CreationStep response', async () => {
    const response = await sut.run({
      user,
      data: {
        ...createTaskData({ user_id: user.id }),
      },
    })

    expect(creationStep.mock).not.toBeUndefined()
    expect(creationStep.mock.results[0].value.run).toHaveBeenCalled()
    expect(response).toEqual(
      creationStep.mock.results[0].value.run.mock.results[1].value,
    )
  })

  it('should call CreationStep sending validationStep data', async () => {
    await sut.run({
      user,
      data: {
        ...createTaskData({ user_id: user.id }),
      },
    })
    expect(
      validationStep.mock.results[0].value.run.mock.results[2].value,
    ).toEqual(creationStep.mock.results[0].value.run.mock.lastCall[0].data)
  })
})
