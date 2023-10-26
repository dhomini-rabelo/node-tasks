import { sleep } from '../../../../../tests/utils'
import { JWTModule } from '../../../dependencies/modules'
import { randomUUID } from 'crypto'

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
