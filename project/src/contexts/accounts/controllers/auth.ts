import { HttpStatusCode } from '@/application/http/templates/status-code'
import { Request, Response } from 'express'
import { publicRouter } from '../../../core/routes/routers'
import { GetTokenService } from '../services/auth/mediator'

export class AuthController {
  static getToken = new GetTokenService()

  @publicRouter.post('/get-token')
  async login(req: Request, res: Response) {
    return res.status(HttpStatusCode.OK).json({
      token: await AuthController.getToken.run(req.body),
    })
  }
}
