import supertest from 'supertest'
import app from '../../../../core/app'
import { HttpStatusCode } from '@/application/http/templates/status-code'

describe('notFoundMiddleware', () => {
  it('should return NotFount for unregistered route', async () => {
    const response = await supertest(app).post('/unregistered-route').send()
    expect(response.status).toBe(HttpStatusCode.NOT_FOUND)
    expect(response.body).toEqual({})
  })
})
