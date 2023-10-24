export type IBodyError = Record<string, string[]> | { message: string }

export class ValidationError extends Error {
  constructor(public errors: IBodyError) {
    super()
  }
}
