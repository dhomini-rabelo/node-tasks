import { Request, Response } from 'express'
import { publicRouter } from '../../../core/routes/routers'
import { db } from '../../../core/dependencies/db'
import { CreateUserMediator } from '../services/users/register-user/mediator'
import { HttpStatusCode } from '../../../application/http/templates/status-code'

export class UserController {
  @publicRouter.get('/users')
  async index(req: Request, res: Response) {
    return res.status(HttpStatusCode.OK).json({
      data: await db.User.documents.all(),
    })
  }

  @publicRouter.post('/users')
  async store(req: Request, res: Response) {
    const service = new CreateUserMediator()
    await service.run(req.body)
    return res.status(HttpStatusCode.CREATED).send()
  }
}
