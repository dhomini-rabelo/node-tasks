import { Request, Response } from 'express'
import { HttpStatusCode } from '../../../application/http/templates/status-code'
import { publicRouter } from '../../../core/routes/routers'
import { CreateUserService } from '../services/users/register-user/mediator'

export class UserController {
  @publicRouter.post('/users')
  async store(req: Request, res: Response) {
    const createUserService = new CreateUserService()
    await createUserService.run(req.body)
    return res.status(HttpStatusCode.CREATED).send()
  }
}
