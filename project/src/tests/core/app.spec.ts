import { Request, Response } from 'express'
import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '../../core/app'
import { randomUUID } from 'crypto'

describe('express app', () => {
  it('should ensure that app accepts json', async () => {
    const data = { name: 'test' }
    const jsonData = JSON.stringify(data)
    const randomPath = randomUUID()

    app.post(`/${randomPath}`, (req: Request, res: Response) => {
      expect(req.body).toEqual(data)
      return res.status(200).send(data)
    })

    const request = supertest(app)
      .post(`/${randomPath}`)
      .set('Content-Type', 'application/json')
      .send(jsonData)
    await request.expect(200)
  })
})
