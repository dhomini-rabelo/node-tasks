import { authMiddleware } from '@/application/http/middlewares/auth'
import { PublicRouter } from '../../application/http/router/cases/public'

export const publicRouter = new PublicRouter()

export const authRouter = new PublicRouter()
authRouter.use(authMiddleware)
