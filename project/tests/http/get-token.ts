import { HttpStatusCode } from '@/application/http/templates/status-code'
import app from '@/core/app'
import { JWTModule } from '@/core/dependencies/modules'
import { createUserData } from '@tests/factories/users'
import supertest from 'supertest'

export async function getAuthorizationHeader() {
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

  return `${JWTModule.settings.prefix} ${loginResponse.body.token}`
}
