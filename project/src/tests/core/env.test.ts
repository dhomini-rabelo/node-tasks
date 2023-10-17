import { describe, expect, it } from 'vitest'
import { env } from '../../core/env'

describe('env.ts', () => {
  it('should ensure that env variable is working', () => {
    expect(env.NODE_ENV).toBe('test')
  })
})
