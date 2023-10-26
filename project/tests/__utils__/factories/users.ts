import { IUserParams } from '../../../src/application/db/schemas/users'
import { db } from '../../../src/core/dependencies/db'
import { some } from '../utils/some'

export function createUserData() {
  return {
    username: some.text(),
    password: some.text(10),
  }
}

export async function createUser({
  username = some.text(),
  password = some.text(10),
}: Partial<IUserParams> = {}) {
  return db.User.operations.create({
    username,
    password,
  })
}

export async function createUsers(
  quantity = 2,
  params: Partial<IUserParams> = {},
) {
  return db.User.operations.createMany(
    Array.from({
      length: quantity,
    }).map((i) => ({
      username: `${params.username || some.text()}_${String(i)}`,
      password: `${params.password || some.text()}_${String(i)}`,
    })),
  )
}
