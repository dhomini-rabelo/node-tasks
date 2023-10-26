import { randomUUID } from 'crypto'
import { Mock, vi } from 'vitest'
import { CreateUserMediator } from '../../../../services/users/register-user/mediator'
import { some } from '../../../../../../../tests/utils/some'
import '../../../../../../../tests/setup/mongoose'
import { ValidateUserDataService } from '../../../../services/users/register-user/validation'
import { CreateUserService } from '../../../../services/users/register-user/creation'

vi.mock('../../../../services/users/register-user/validation', () => {
  return {
    ValidateUserDataService: vi.fn(() => ({
      run: vi.fn((data) => data),
    })),
  }
})

vi.mock('../../../../services/users/register-user/creation', () => {
  return {
    CreateUserService: vi.fn(() => ({
      run: vi.fn((data) => ({ ...data, id: randomUUID() })),
    })),
  }
})

describe('CreateUserMediator', () => {
  const sut = new CreateUserMediator()

  it('should run ValidateUserDataService and CreateUserService services', async () => {
    const response = await sut.run({
      username: some.text(),
      password: some.text(10),
      confirm_password: some.text(10),
    })
    const validationService = ValidateUserDataService as Mock
    const creationService = CreateUserService as Mock
    expect(validationService.mock.results[0].value.run).toHaveBeenCalled()
    expect(creationService.mock.results[0].value.run).toHaveBeenCalled()
    expect(response).toEqual(
      creationService.mock.results[0].value.run.mock.results[0].value,
    )
  })
})
