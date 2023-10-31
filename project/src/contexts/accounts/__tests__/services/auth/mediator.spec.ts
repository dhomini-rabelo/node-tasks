import { GetTokenService } from '@/contexts/accounts/services/auth/mediator'
import { VerifyCredentialsStep } from '@/contexts/accounts/services/auth/verify-credentials'
import { JWTModule } from '@/core/dependencies/modules'
import { randomUUID } from 'crypto'
import { Mock, vi } from 'vitest'
import { some } from '../../../../../../tests/utils/some'
import { ValidateUserDataStep } from '../../../services/auth/validation'

vi.mock('../../../services/auth/validation', () => {
  return {
    ValidateUserDataStep: vi.fn(() => ({
      run: vi.fn((data) => data),
    })),
  }
})

vi.mock('../../../services/auth/verify-credentials', () => {
  return {
    VerifyCredentialsStep: vi.fn(() => ({
      run: vi.fn((data) => ({ ...data, id: randomUUID() })),
    })),
  }
})

vi.mock('@/core/dependencies/modules', () => {
  return {
    JWTModule: {
      generateToken: vi.fn(() => randomUUID()),
    },
  }
})

describe('GetTokenService', () => {
  const sut = new GetTokenService()

  it('should ensure mediator flow', async () => {
    const response = await sut.run({
      username: some.text(),
      password: some.text(10),
    })
    const validationService = ValidateUserDataStep as Mock
    const verifyCredentialsStep = VerifyCredentialsStep as Mock
    /* eslint-disable */
    // @ts-expect-error
    const jwtModule = JWTModule as { generateToken: Mock }

    expect(validationService.mock.results[0].value.run).toHaveBeenCalled()
    expect(
      verifyCredentialsStep.mock.results[0].value.run,
    ).toHaveBeenCalled()
    expect(jwtModule.generateToken).toHaveBeenCalled()
    expect(response).toEqual(jwtModule.generateToken.mock.results[0].value)
  })
})
