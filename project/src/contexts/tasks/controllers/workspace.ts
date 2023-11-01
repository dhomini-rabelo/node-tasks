import { AuthRequestOutput } from '@/application/http/middlewares/auth'
import { Response } from 'express'
import { HttpStatusCode } from '../../../application/http/templates/status-code'
import { authRouter } from '../../../core/routes/routers'
import { CreateWorkspaceService } from '../services/create-workspace/main'

export class WorkspaceController {
  @authRouter.post('/workspaces')
  async store(req: AuthRequestOutput, res: Response) {
    const service = new CreateWorkspaceService()
    return res.status(HttpStatusCode.CREATED).json(
      await service.run({
        payload: req.body,
        user: req.user,
      }),
    )
  }
}
