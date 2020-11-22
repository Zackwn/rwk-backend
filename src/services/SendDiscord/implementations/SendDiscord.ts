import { ISendDiscord, DiscordSendStatus } from '../index'
import fetch from 'isomorphic-unfetch'

export class SendDiscord implements ISendDiscord {
  async send(webhookURL: string, content: any): Promise<DiscordSendStatus> {
    try {
      await fetch(webhookURL, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      return "SUCCESS"
    } catch (error) {
      console.log({ DiscordSendError: error })
      return "FAILED"
    }
  }
}