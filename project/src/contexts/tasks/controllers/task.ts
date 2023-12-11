import { AuthRequestOutput } from '@/application/http/middlewares/auth'
import { Response } from 'express'
import { HttpStatusCode } from '../../../application/http/templates/status-code'
import { authRouter } from '../../../core/routes/routers'
import { CreateTaskService } from '../services/create-task'
import { ListTaskService } from '../services/list-task'

export class TaskController {
  @authRouter.get('/tasks')
  async index(req: AuthRequestOutput, res: Response) {
    const service = new ListTaskService()
    return res.status(HttpStatusCode.OK).json(await service.run())
  }

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
