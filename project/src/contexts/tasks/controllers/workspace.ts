import { Request, Response } from 'express'
import { HttpStatusCode } from '../../../application/http/templates/status-code'
import { authRouter } from '../../../core/routes/routers'

export class WorkspaceController {
  @authRouter.post('/workspaces')
  async store(req: Request, res: Response) {
    return res.status(HttpStatusCode.CREATED).send()
  }
}
