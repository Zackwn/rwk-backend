import { ISendDiscord, DiscordSendStatus, SendDiscordOptions } from '../index'
import fetch from 'isomorphic-unfetch'
import { IPostToEmbedMessage } from '../../../adapters/PostToEmbedMessage'

export class SendDiscord implements ISendDiscord {
  private readonly postToEmbedMessage: IPostToEmbedMessage

  public constructor(postToEmbedMessage: IPostToEmbedMessage) {
    this.postToEmbedMessage = postToEmbedMessage
  }

  async exec(options: SendDiscordOptions): Promise<DiscordSendStatus> {
    try {
      const embed = this.postToEmbedMessage.exec({
        redditPost: options.post,
        redditUser: options.user
      })

      console.log({ embed })

      const r = await fetch(options.webhookURL, {
        method: 'POST',
        body: JSON.stringify({
          embeds: [embed]
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      console.log({ statusCode: r.status })
      if (r.status !== 204) {
        console.log({ discordResponse: await r.json(), })
      }

      return "SUCCESS"
    } catch (error) {
      console.log({ DiscordSendError: error })
      return "FAILED"
    }
  }
}