import { HttpStatusCode } from '@/application/http/templates/status-code'
import { CreateUserService } from '@/contexts/accounts/services/users/register-user/mediator'
import app from '@/core/app'
import { createTask, createTasks } from '@tests/factories/tasks'
import { createUser, createUserData } from '@tests/factories/users'
import {
  getAuthorizationHeader,
  getAuthorizationHeaderFromUser,
} from '@tests/http/get-token'
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
      const user = await createUser()
      await createTasks(2, { user_id: user.id })

      await supertest(app)
        .get(path)
        .set('Authorization', await getAuthorizationHeader())
        .expect(HttpStatusCode.OK)
    })
  })

  describe('[POST] /mark-as-done/:id', () => {
    it('mark task as done', async () => {
      const userData = createUserData()
      const user = await new CreateUserService().run({
        ...userData,
        confirm_password: userData.password,
      })
      const task = await createTask({ user_id: user.id })

      await supertest(app)
        .post(`${path}/mark-as-done/${task.id}`)
        .set('Authorization', await getAuthorizationHeaderFromUser(userData))
        .expect(HttpStatusCode.OK)
    })
  })
})
