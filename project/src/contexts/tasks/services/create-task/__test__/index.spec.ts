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
      run: vi.fn((data) => data),
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
    const validationStep = ValidationStep as Mock
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
    const creationStep = CreationStep as Mock
    expect(creationStep.mock).not.toBeUndefined()
    expect(creationStep.mock.results[0].value.run).toHaveBeenCalled()
    expect(response).toEqual(
      creationStep.mock.results[0].value.run.mock.results[1].value,
    )
  })
})
