import { Server as SocketServer } from 'socket.io'

declare global {
  namespace Express {
    export interface Request {
      socketIo: SocketServer,
      socketId: string
    }
  }
}
