import { HttpStatusCode } from '@/application/http/templates/status-code'
import { BaseHttpError } from './base'

export class ForbiddenHttpError extends BaseHttpError {
  public status = HttpStatusCode.FORBIDDEN
}
