import { Request, Response } from 'express'
import supertest from 'supertest'
import app from '../../src/core/app'
import { randomUUID } from 'crypto'
import '../__utils__/setup/new-route'

describe('express app', () => {
  it('should ensure that app accepts json', async () => {
    const data = { name: 'test' }
    const jsonData = JSON.stringify(data)
    const randomPath = `/${randomUUID()}`

    app.post(randomPath, (req: Request, res: Response) => {
      expect(req.body).toEqual(data)
      return res.status(200).json(data)
    })

    const response = await supertest(app)
      .post(randomPath)
      .set('Content-Type', 'application/json')
      .send(jsonData)
      .expect(200)

    expect(response.body).toEqual(data)
  })
})
