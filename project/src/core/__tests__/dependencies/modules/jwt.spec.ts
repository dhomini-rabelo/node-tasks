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

  it('should return false when prefix is invalid', () => {
    const jwtModule = JWTModule.clone({
      prefix: 'TEST',
    })

    const comparison = jwtModule.prefixIsValid('incorrect-prefix')

    expect(comparison).toBeFalsy()
  })

  it('should return true when prefix is valid', () => {
    const prefix = 'Bearer'
    const jwtModule = JWTModule.clone({
      prefix,
    })

    const comparison = jwtModule.prefixIsValid(prefix)

    expect(comparison).toBeTruthy()
  })

  it('should return false when to verify expired token', async () => {
    const jwtModule = JWTModule.clone({
      expiresIn: 50,
    })

    const userId = randomUUID() + randomUUID()
    const token = jwtModule.generateToken(userId)
    await sleep(100)
    const comparison = jwtModule.verifyToken(token)

    expect(comparison).toBeFalsy()
  })
})
