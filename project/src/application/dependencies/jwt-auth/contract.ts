export type ISettings = {
  expiresIn: number
  SECRET_KEY: string
}

export interface IJWTModule {
  readonly settings: ISettings
  generateToken: (userId: string) => string
  verifyToken: (token: string) => boolean
}
