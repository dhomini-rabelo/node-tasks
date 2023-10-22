import { describe, expect, it } from 'vitest'
import supertest from 'supertest'
import app from '../../../../core/app'
import { ErrorMessages } from '../../../../application/http/error/messages'
import '../../../../tests/setup/mongoose'
import { some } from '../../../../tests/utils/some'
import { db } from '../../../../core/dependencies/db'
import { UserModelSchema } from '../../../../tests/tests/db/users/_index'
import { HttpStatusCode } from '../../../../application/http/templates/status-code'

describe('User Controller', () => {
  describe('Create user', () => {
    it('should create an user', async () => {
      const userData = { username: some.text(), password: some.text(10) }
      await supertest(app)
        .post('/users')
        .send({
          ...userData,
          confirm_password: userData.password,
        })
        .expect(HttpStatusCode.CREATED)

      const createdUser = await db.User.documents.findOne({
        username: userData.username,
      })

      expect(createdUser).toEqual(expect.objectContaining(UserModelSchema))
      expect(createdUser?.password).not.toEqual(userData.password)
    })
    it('should return validation errors for invalid body', async () => {
      const response = await supertest(app)
        .post('/users')
        .send({})
        .expect(HttpStatusCode.BAD_REQUEST)
      expect(response.body).toEqual({
        username: [ErrorMessages.REQUIRED],
        password: [ErrorMessages.REQUIRED],
        confirm_password: [ErrorMessages.REQUIRED],
      })
    })
  })
})
