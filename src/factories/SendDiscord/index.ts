import { SendDiscord } from '../../services/SendDiscord/implementations/SendDiscord'
import { generatePostToEmbedMessage } from '../PostToEmbedMessage'

export const generateSendDiscord = () => {
  return new SendDiscord(generatePostToEmbedMessage())
}