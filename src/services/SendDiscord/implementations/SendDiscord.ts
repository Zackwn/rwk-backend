import { ISendDiscord, DiscordSendStatus, SendDiscordOptions } from '../index'
import fetch from 'isomorphic-unfetch'

export class SendDiscord implements ISendDiscord {
  async exec(options: SendDiscordOptions): Promise<DiscordSendStatus> {
    try {
      const embed = {
        image: {
          url: options.postURL
        },
        author: {
          name: options.user.name,
          icon_url: options.user.profilePictureURL
        }
      }

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