import { Router } from 'express'

// useCases
import { generateSendUseCase } from './factories/SendUseCase'
const sendUseCase = generateSendUseCase()

const routes = Router()

routes.get('/working-status', (_, res) => {
  return res.json({ status: true })
})

routes.post('/api/send', async (req, res) => {
  const {
    socketID,
    limit,
    subreddit,
    webhookUrl
  } = req.body

  const data = {
    socketID,
    limit,
    subreddit,
    webhookUrl
  }

  return res.json(await sendUseCase.handle(data, req.socketIo))
})

export { routes }