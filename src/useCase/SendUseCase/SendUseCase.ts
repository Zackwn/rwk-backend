import { IRedditPosts } from '../../services/RedditPosts'
import { ISendDiscord } from '../../services/SendDiscord'
import { SendUseCaseDTO } from './SendDTO'
import { Server as SocketServer } from 'socket.io'

export class SendUseCase {
  RedditPosts: IRedditPosts
  SendDiscord: ISendDiscord

  constructor(redditPosts: IRedditPosts, sendDiscord: ISendDiscord) {
    this.RedditPosts = redditPosts
    this.SendDiscord = sendDiscord
  }

  async handle({ limit, socketID, subreddit, webhookUrl }: SendUseCaseDTO, socketIo: SocketServer) {
    console.log({ limit, subreddit, webhookUrl, socketID })

    const room = `status_room:${socketID}`

    let client = socketIo.sockets.sockets.get(socketID)
    if (client) {
      console.log('there is a client!')
      let data = (await this.RedditPosts.getBySubreddit({ subreddit, limit })).map(e => ({ url: e, status: 'PENDING' }))
      let index = 0
      let intervalID = setInterval(() => {
        this.SendDiscord.send(webhookUrl, data[index].url).then(status => {
          console.log({ index })
          data[index].status = status
          console.log(data[index])
          socketIo.emit(room, { status: data[index].status, index: index })
          index++
          if (index === data.length) {
            socketIo.emit(room, { end: true })
            clearInterval(intervalID)
          }
        })
      }, 10000 * 2)
      return { room, statusData: data }
    } else {
      throw new Error('client not connected')
    }
  }
}