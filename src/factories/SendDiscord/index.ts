import { SendDiscord } from '../../services/SendDiscord/implementations/SendDiscord'

export const generateSendDiscord = () => {
  return new SendDiscord()
}