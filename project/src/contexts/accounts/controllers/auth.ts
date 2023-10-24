import { Request, Response } from 'express'
import { publicRouter } from '../../../core/routes/routers'
import { GetTokenMediator } from '../services/auth/mediator'

export class AuthController {
  static getToken = new GetTokenMediator()

  @publicRouter.post('/get-token')
  async login(req: Request, res: Response) {
    return res.status(200).json({
      token: await AuthController.getToken.run(req.body),
    })
  }
}
