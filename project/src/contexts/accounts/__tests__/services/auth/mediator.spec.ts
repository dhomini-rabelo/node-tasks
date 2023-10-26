import { GetTokenMediator } from '@/contexts/accounts/services/auth/mediator'
import { randomUUID } from 'crypto'
import { Mock, vi } from 'vitest'
import { some } from '../../../../../../tests/utils/some'
import { ValidateUserDataService } from '../../../services/auth/validation'
import { VerifyCredentialsService } from '@/contexts/accounts/services/auth/verify-credentials'
import { JWTModule } from '@/core/dependencies/modules'

vi.mock('../../../services/auth/validation', () => {
  return {
    ValidateUserDataService: vi.fn(() => ({
      run: vi.fn((data) => data),
    })),
  }
})

vi.mock('../../../services/auth/verify-credentials', () => {
  return {
    VerifyCredentialsService: vi.fn(() => ({
      run: vi.fn((data) => ({ ...data, id: randomUUID() })),
    })),
  }
})

vi.mock('../../../../../../src/core/dependencies/modules', () => {
  return {
    JWTModule: {
      generateToken: vi.fn(() => randomUUID()),
    },
  }
})

describe('GetTokenMediator', () => {
  const sut = new GetTokenMediator()

  it('should ensure mediator flow', async () => {
    const response = await sut.run({
      username: some.text(),
      password: some.text(10),
    })
    const validationService = ValidateUserDataService as Mock
    const verifyCredentialsService = VerifyCredentialsService as Mock
    /* eslint-disable */
    // @ts-expect-error
    const jwtModule = JWTModule as { generateToken: Mock }

    expect(validationService.mock.results[0].value.run).toHaveBeenCalled()
    expect(
      verifyCredentialsService.mock.results[0].value.run,
    ).toHaveBeenCalled()
    expect(jwtModule.generateToken).toHaveBeenCalled()
    expect(response).toEqual(jwtModule.generateToken.mock.results[0].value)
  })
})
