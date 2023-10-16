import { Request, Response } from 'express'
import { publicRouter } from '../../../core/router'
import { db } from '../../../core/db'
import { CreateUserMediator } from '../services/users/register-user/mediator'

export class UserController {
  @publicRouter.get('/users')
  async index(req: Request, res: Response) {
    return res.status(200).json({
      data: await db.User.documents.all(),
    })
  }

  @publicRouter.post('/users')
  async store(req: Request, res: Response) {
    const service = new CreateUserMediator()
    return res.status(200).json({
      data: await service.run(req.body),
    })
  }
}
