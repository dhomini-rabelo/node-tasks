import { JWTModule } from '../../../../src/core/dependencies/modules'
import { randomBytes, randomUUID } from 'crypto'

export function sleep(ms: number) {
  /* eslint-disable no-promise-executor-return */
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const some = {
  text(size = 5): string {
    const response = randomBytes(Math.ceil(size / 2)).toString('hex')
    return size % 2 === 0 ? response : response.slice(1)
  },
}

describe('JWTModule', () => {
  it('should generate a token', () => {
    const userId = randomUUID()
    const token = JWTModule.generateToken(userId)
    expect(token !== userId).toBeTruthy()
    expect(token.length > userId.length).toBeTruthy()
  })

  it('should return true when to verify correct input', () => {
    const userId = randomUUID()
    const token = JWTModule.generateToken(userId)
    const comparison = JWTModule.verifyToken(token)
    expect(comparison).toBeTruthy()
  })

  it('should return false when to verify incorrect token', () => {
    const comparison = JWTModule.verifyToken('incorrect token')
    expect(comparison).toBeFalsy()
  })

  it('should return false when to verify expired token', async () => {
    // setup
    const initialExpiresIn = JWTModule.settings.expiresIn
    JWTModule.settings.expiresIn = 50

    // test
    const userId = randomUUID() + randomUUID()
    const token = JWTModule.generateToken(userId)
    await sleep(100)
    const comparison = JWTModule.verifyToken(token)
    expect(comparison).toBeFalsy()

    // tear down
    JWTModule.settings.expiresIn = initialExpiresIn
  })
})
