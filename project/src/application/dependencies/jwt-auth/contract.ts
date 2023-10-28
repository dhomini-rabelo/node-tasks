export type ISettingsInput = {
  expiresIn: number
  SECRET_KEY: string
  prefix?: string
}

export interface ISettings extends Omit<ISettingsInput, 'prefix'> {
  prefix: string
}

export abstract class IJWTModule {
  constructor(
    public readonly settings: ISettings,
  ) { } // prettier-ignore

  abstract generateToken(userId: string): string
  abstract verifyToken(token: string): boolean
  abstract prefixIsValid(prefix: string): boolean
  abstract clone(userId: Partial<ISettings>): IJWTModule
}
