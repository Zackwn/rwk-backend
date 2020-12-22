import { Request, Response, NextFunction } from 'express'

export default function withSocketID(req: Request, res: Response, next: NextFunction) {
  if (req.headers['socketid']) {
    try {
      req.socketId = String(req.headers['socketid'])
      next()
    } catch (error) {
      return res.status(400).send()
    }
  } else {
    return res.status(400).send()
  }
}