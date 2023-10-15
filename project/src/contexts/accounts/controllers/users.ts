import { Request, Response } from 'express'
import { publicRouter } from '../../../core/router'
import { db } from '../../../core/db'

export class UserController {
  @publicRouter.get('/users')
  async index(req: Request, res: Response) {
    return res.status(200).json({
      data: await db.User.documents.all(),
    })
  }
}
