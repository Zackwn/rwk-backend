import cors from 'cors'
import express from 'express'
import * as http from 'http'
import { Server } from 'socket.io'
import { routes } from './routes'

const PORT = Number(process.env.PORT) || 3333
// const dev = process.env.NODE_ENV !== 'production'

const app = express()
const server = http.createServer(app)
const io: Server = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
})

app.disable('x-powered-by')
app.use(cors())
app.use(express.json())

app.use((req, _, next) => {
  req.socketIo = io
  next()
})

app.use(routes)

const connected: { [key: string]: true } = {}
io.on('connection', socket => {
  console.log(`${socket.id} connected!`)
  connected[socket.id] = true

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnect!`)

    delete connected[socket.id]
  })
})

server.listen(PORT, () => {
  console.log(`> Ready on http://localhost:${PORT}`)
})
