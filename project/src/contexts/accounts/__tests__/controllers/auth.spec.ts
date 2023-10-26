import supertest from 'supertest'
import app from '../../../../core/app'
import '../../../../../tests/setup/mongoose'
import { some } from '../../../../../tests/utils/some'
import { HttpStatusCode } from '../../../../application/http/templates/status-code'
import { CreateUserService } from '@/contexts/accounts/services/users/register-user/creation'
import {
  createUser,
  createUserData,
} from '../../../../../tests/factories/users'
import { ErrorMessages } from '@/application/http/error/messages'

describe('AuthController', () => {
  const createUserService = new CreateUserService()

  describe('login', () => {
    const errorPayload = { message: ErrorMessages.INVALID_CREDENTIALS }

    it('should get token for user with encrypted password', async () => {
      const userData = createUserData()
      await createUserService.run(userData)
      const response = await supertest(app)
        .post('/get-token')
        .send(userData)
        .expect(HttpStatusCode.OK)
      expect(response.body).toEqual({
        token: expect.any(String),
      })
    })

    it('should throw forbidden error for user without encrypted password', async () => {
      const userData = createUserData()
      await createUser(userData)
      const response = await supertest(app)
        .post('/get-token')
        .send(userData)
        .expect(HttpStatusCode.FORBIDDEN)
      expect(response.body).toEqual(errorPayload)
    })

    it('should throw forbidden error for incorrect password', async () => {
      const userData = createUserData()
      const incorrectPassword = some.text(11)
      await createUserService.run(userData)
      const response = await supertest(app)
        .post('/get-token')
        .send({ ...userData, password: incorrectPassword })
        .expect(HttpStatusCode.FORBIDDEN)
      expect(response.body).toEqual(errorPayload)
    })

    it('should throw forbidden error for not found user', async () => {
      const nonExistentUsername = some.text(11)
      const response = await supertest(app)
        .post('/get-token')
        .send({ username: nonExistentUsername, password: some.text(10) })
        .expect(HttpStatusCode.FORBIDDEN)
      expect(response.body).toEqual(errorPayload)
    })

    it('should return validation errors for invalid body', async () => {
      const response = await supertest(app)
        .post('/get-token')
        .send({})
        .expect(HttpStatusCode.BAD_REQUEST)
      expect(response.body).toEqual({
        username: [ErrorMessages.REQUIRED],
        password: [ErrorMessages.REQUIRED],
      })
    })
  })
})
