import { removeUndefinedKeys } from '@/application/utils/generic'

describe('generic functions', () => {
  describe('removeUndefinedKeys', () => {
    it('should remove undefined keys', () => {
      const user = {
        id: undefined,
        name: 'John Doe',
        age: undefined,
      }
      expect(removeUndefinedKeys(user)).toEqual({ name: user.name })
    })
    it('should not remove any key', () => {
      const user = {
        id: 1,
        name: 'John Doe',
        work: null,
        birth: new Date(),
        isDead: false,
      }
      expect(removeUndefinedKeys(user)).toEqual(user)
    })
  })
})
