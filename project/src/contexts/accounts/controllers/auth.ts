import { Request, Response } from 'express'
import { publicRouter } from '../../../core/router'
import { JWTModule } from '../../../core/dependencies'

export class AuthController {
  @publicRouter.post('/get-token')
  async login(req: Request, res: Response) {
    const token = JWTModule.generateToken(req.body.token)
    return res.status(200).json({
      token,
    })
  }
}
