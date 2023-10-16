export interface IJWTModule {
  generateToken: (userId: string) => string
  verifyToken: (token: string) => boolean
}
