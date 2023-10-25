export abstract class BaseHttpError extends Error {
  public abstract status: number
  public payload: { message: string }

  constructor(message: string) {
    super()
    this.payload = {
      message,
    }
  }
}
