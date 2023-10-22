import { expect } from 'vitest'

export const UserModelSchema = {
  username: expect.any(String),
  password: expect.any(String),
}
