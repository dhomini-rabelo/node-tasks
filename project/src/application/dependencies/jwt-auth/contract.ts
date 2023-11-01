export type ISettings = {
  expiresIn: number
  SECRET_KEY: string
  prefix: string
}

export abstract class IJWTModule {
  constructor(
    public readonly settings: Readonly<ISettings>,
  ) { } // prettier-ignore

  abstract generateToken(userId: string): string
  abstract verifyToken(token: string): boolean
  abstract getToken(token: string): string
  abstract prefixIsValid(prefix: string): boolean
  abstract clone(userId: Partial<ISettings>): IJWTModule
}
