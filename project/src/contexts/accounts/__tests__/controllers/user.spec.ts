import supertest from 'supertest'
import app from '../../../../core/app'
import { ErrorMessages } from '../../../../application/http/error/messages'
import '../../../../../tests/setup/mongoose'
import { db } from '../../../../core/dependencies/db'
import { UserModelSchema } from '../../../../core/__tests__/db/users/_index'
import { HttpStatusCode } from '../../../../application/http/templates/status-code'
import { createUserData } from '../../../../../tests/factories/users'

describe('User Controller', () => {
  describe('Create user', () => {
    it('should create an user', async () => {
      const userData = createUserData()
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

      expect(createdUser).toEqual(UserModelSchema)
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
