import supertest from 'supertest'
import app from '../../../../src/core/app'
import '../../../__utils__/setup/mongoose'
import { some } from '../../../__utils__/utils/some'
import { HttpStatusCode } from '@/application/http/templates/status-code'

describe('Register and login', () => {
  it('should create an user and get-token', async () => {
    const userData = { username: some.text(), password: some.text(10) }

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
