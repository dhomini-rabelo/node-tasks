import { Request, Response, NextFunction } from 'express'

export type IRoute = (req: Request, res: Response, next: NextFunction) => any
