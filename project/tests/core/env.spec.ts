import { env } from '../../src/core/dependencies/env'

describe('env', () => {
  it('should ensure that env variables is working', () => {
    expect(env.NODE_ENV).toBe('test')
  })
})
