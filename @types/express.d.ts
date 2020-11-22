import { Server as SocketServer } from 'socket.io'

declare global {
  declare namespace Express {
    export interface Request {
      socketIo: SocketServer
    }
  }
}
