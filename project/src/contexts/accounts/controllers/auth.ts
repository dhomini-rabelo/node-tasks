import { HttpStatusCode } from '@/application/http/templates/status-code'
import { Request, Response } from 'express'
import { publicRouter } from '../../../core/routes/routers'
import { GetTokenService } from '../services/auth/mediator'

export class AuthController {
  @publicRouter.post('/get-token')
  async login(req: Request, res: Response) {
    const getTokenService = new GetTokenService()
    return res.status(HttpStatusCode.OK).json({
      token: await getTokenService.run(req.body),
    })
  }
}
