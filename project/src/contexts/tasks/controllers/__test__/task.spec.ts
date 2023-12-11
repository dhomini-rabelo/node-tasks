import { HttpStatusCode } from '@/application/http/templates/status-code'
import app from '@/core/app'
import { getAuthorizationHeader } from '@tests/http/get-token'
import '@tests/setup/mongoose'
import { some } from '@tests/utils/some'
import supertest from 'supertest'

describe('TaskController (e2e)', () => {
  const path = '/tasks'

  describe('[POST] /tasks', () => {
    it('create task', async () => {
      await supertest(app)
        .post(path)
        .set('Authorization', await getAuthorizationHeader())
        .send({
          title: some.text(11),
          description: some.text(3),
        })
        .expect(HttpStatusCode.CREATED)
    })
  })

  describe('[GET] /tasks', () => {
    it('list tasks', async () => {
      await supertest(app)
        .get(path)
        .set('Authorization', await getAuthorizationHeader())
        .expect(HttpStatusCode.OK)
    })
  })
})
