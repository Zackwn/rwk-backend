import { RedditUser } from "../RedditPosts";

export type DiscordSendStatus = "SUCCESS" | "FAILED"

export interface SendDiscordOptions {
  webhookURL: string,
  postURL: string,
  user: RedditUser
}

export interface ISendDiscord {
  exec(options: SendDiscordOptions): Promise<DiscordSendStatus>
}
