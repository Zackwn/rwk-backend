import { SendUseCase } from '../../useCase/SendUseCase'

// dependencies
import { generateRedditPosts } from '../RedditPosts'
import { generateSendDiscord } from '../SendDiscord'

export const generateSendUseCase = () => {
  const redditPosts = generateRedditPosts()
  const sendDiscord = generateSendDiscord()

  return new SendUseCase(redditPosts, sendDiscord)
}