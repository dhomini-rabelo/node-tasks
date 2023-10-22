import supertest from 'supertest'
import app from '../../../../src/core/app'

describe('notFoundMiddleware', () => {
  it('should return NotFount for unregistered route', async () => {
    const response = await supertest(app).post('/unregistered-route').send()
    expect(response.status).toBe(404)
    expect(response.body).toEqual({})
  })
})
