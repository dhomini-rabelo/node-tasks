import { HttpStatusCode } from '@/application/http/templates/status-code'
import { BaseHttpError } from './base'

export class UnauthorizedHttpError extends BaseHttpError {
  public status = HttpStatusCode.UNAUTHORIZED
}
