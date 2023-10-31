import { randomUUID } from 'crypto'
import { Mock, vi } from 'vitest'
import '../../../../../../../tests/setup/mongoose'
import { some } from '../../../../../../../tests/utils/some'
import { CreateUserStep } from '../../../../services/users/register-user/creation'
import { CreateUserService } from '../../../../services/users/register-user/mediator'
import { ValidateUserDataStep } from '../../../../services/users/register-user/validation'

vi.mock('../../../../services/users/register-user/validation', () => {
  return {
    ValidateUserDataStep: vi.fn(() => ({
      run: vi.fn((data) => data),
    })),
  }
})

vi.mock('../../../../services/users/register-user/creation', () => {
  return {
    CreateUserStep: vi.fn(() => ({
      run: vi.fn((data) => ({ ...data, id: randomUUID() })),
    })),
  }
})

describe('CreateUserService', () => {
  const sut = new CreateUserService()

  it('should run ValidateUserDataStep and CreateUserStep services', async () => {
    const response = await sut.run({
      username: some.text(),
      password: some.text(10),
      confirm_password: some.text(10),
    })
    const validationService = ValidateUserDataStep as Mock
    const creationService = CreateUserStep as Mock
    expect(validationService.mock.results[0].value.run).toHaveBeenCalled()
    expect(creationService.mock.results[0].value.run).toHaveBeenCalled()
    expect(response).toEqual(
      creationService.mock.results[0].value.run.mock.results[0].value,
    )
  })
})
