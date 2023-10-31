import { Request, Response } from 'express'
import { HttpStatusCode } from '../../../application/http/templates/status-code'
import { publicRouter } from '../../../core/routes/routers'
import { CreateUserService } from '../services/users/register-user/mediator'

export class UserController {
  static createUserSCreateUserService = new CreateUserService()

  @publicRouter.post('/users')
  async store(req: Request, res: Response) {
    await UserController.createUserSCreateUserService.run(req.body)
    return res.status(HttpStatusCode.CREATED).send()
  }
}
