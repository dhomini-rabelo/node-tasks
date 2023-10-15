import { Request, Response } from 'express'
import { publicRouter } from '../../../core/router'

export class UserController {
  @publicRouter.get('/users')
  index(req: Request, res: Response) {
    return res.status(200).json({
      data: [],
    })
  }
}
