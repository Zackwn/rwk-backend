import { Router } from 'express'

// useCases
import { generateSendUseCase } from './factories/SendUseCase'
import withSocketID from './middlewares/withSocketID'
import { SendUseCaseDTO } from './useCase/SendUseCase/SendDTO'
const sendUseCase = generateSendUseCase()

const routes = Router()

routes.get('/working-status', (_, res) => {
  return res.json({ status: true })
})

routes.post('/api/send', withSocketID, async (req, res) => {
  const {
    limit,
    subreddit,
    webhookUrl
  } = req.body

  const accessToken = req.headers['access_token']

  if (!accessToken) {
    return res.status(401).send()
  }

  const data: SendUseCaseDTO = {
    socketID: req.socketId,
    limit,
    subreddit,
    webhookUrl,
    accessToken: String(accessToken)
  }

  return res.json(await sendUseCase.handle(data, req.socketIo))
})

export { routes }