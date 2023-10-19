import { randomBytes } from 'node:crypto'

export const some = {
  text(size = 7): string {
    const response = randomBytes(Math.ceil(size / 2)).toString('hex')
    return size % 2 === 0 ? response : response.slice(1)
  },
}
