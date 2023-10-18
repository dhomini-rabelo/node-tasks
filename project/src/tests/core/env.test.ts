import { describe, expect, it } from 'vitest'
import { env } from '../../core/dependencies/env'

describe('env', () => {
  it('should ensure that env variables is working', () => {
    expect(env.NODE_ENV).toBe('test')
  })
})
