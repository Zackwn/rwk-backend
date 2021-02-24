import { IRedditAPI } from '../../services/RedditPosts'
import { ISendDiscord } from '../../services/SendDiscord'
import { SendUseCaseDTO } from './SendDTO'
import { Server as SocketServer } from 'socket.io'

export class SendUseCase {
  RedditAPI: IRedditAPI
  SendDiscord: ISendDiscord

  constructor(redditAPI: IRedditAPI, sendDiscord: ISendDiscord) {
    this.RedditAPI = redditAPI
    this.SendDiscord = sendDiscord
  }

  async handle({ limit, socketID, subreddit, webhookUrl, accessToken }: SendUseCaseDTO, socketIo: SocketServer) {
    console.log({ limit, subreddit, webhookUrl, socketID })

    const room = `status_room:${socketID}`

    let client = socketIo.sockets.sockets.get(socketID)
    if (client) {
      console.log('there is a client!')

      const redditUser = await this.RedditAPI.getMe({ accessToken })

      console.log({ redditUser })

      const posts = (await this.RedditAPI.getByPostsSubreddit({ subreddit, limit, accessToken }))
        .map(e => ({ url: e.url, status: 'PENDING' }))

      console.log({ posts })

      let index = 0

      let intervalID = setInterval(() => {
        this.SendDiscord.exec({
          webhookURL: webhookUrl,
          postURL: posts[index].url,
          user: redditUser
        }).then(status => {
          posts[index].status = status

          console.log(posts[index])

          socketIo.emit(room, { status: posts[index].status, index: index })
          index++

          if (index === posts.length) {
            socketIo.emit(room, { end: true })
            clearInterval(intervalID)
          }
        })
      }, 10000 * 2)

      return { room, statusData: posts }
    } else {
      throw new Error('client not connected')
    }
  }
}