import supertest from 'supertest'
import app from '../../../../core/app'
import '../../../../../tests/setup/mongoose'
import { HttpStatusCode } from '@/application/http/templates/status-code'
import { createUserData } from '../../../../../tests/factories/users'

describe('Register and login', () => {
  it('should create an user and get-token', async () => {
    const userData = createUserData()

    await supertest(app)
      .post('/users')
      .send({
        ...userData,
        confirm_password: userData.password,
      })
      .expect(HttpStatusCode.CREATED)

    const loginResponse = await supertest(app)
      .post('/get-token')
      .send(userData)
      .expect(HttpStatusCode.OK)

    expect(loginResponse.body).toEqual({ token: expect.any(String) })
  })
})
