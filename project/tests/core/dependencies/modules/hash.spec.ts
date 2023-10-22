import { describe, expect, it } from 'vitest'
import { HashModule } from '../../../../src/core/dependencies/modules'

describe('HashModule', () => {
  const input = 'some-string'
  const incorrectInput = 'incorrect-input'

  it('should generate a hash', () => {
    const hash = HashModule.generate(input)
    expect(hash !== input).toBeTruthy()
    expect(hash.length > input.length).toBeTruthy()
  })

  it('should return true when to compare hash with correct input', () => {
    const hash = HashModule.generate(input)
    const comparison = HashModule.compare(input, hash)
    expect(comparison).toBeTruthy()
  })

  it('should return false when to compare hash with incorrect input', () => {
    const hash = HashModule.generate(input)
    const comparison = HashModule.compare(incorrectInput, hash)
    expect(comparison).toBeFalsy()
  })
})
