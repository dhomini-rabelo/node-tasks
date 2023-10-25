import { Request, Response } from 'express'
import { publicRouter } from '../../../core/routes/routers'
import { GetTokenMediator } from '../services/auth/mediator'
import { HttpStatusCode } from '@/application/http/templates/status-code'

export class AuthController {
  static getToken = new GetTokenMediator()

  @publicRouter.post('/get-token')
  async login(req: Request, res: Response) {
    return res.status(HttpStatusCode.OK).json({
      token: await AuthController.getToken.run(req.body),
    })
  }
}
