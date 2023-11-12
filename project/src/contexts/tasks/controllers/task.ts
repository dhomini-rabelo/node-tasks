import { AuthRequestOutput } from '@/application/http/middlewares/auth'
import { Response } from 'express'
import { HttpStatusCode } from '../../../application/http/templates/status-code'
import { authRouter } from '../../../core/routes/routers'
import { CreateTaskService } from '../services/create-task'

export class TaskController {
  @authRouter.post('/tasks')
  async store(req: AuthRequestOutput, res: Response) {
    const service = new CreateTaskService()
    return res.status(HttpStatusCode.CREATED).json(
      await service.run({
        user: req.user,
        data: req.body,
      }),
    )
  }
}
