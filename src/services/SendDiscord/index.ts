import { RedditPost, RedditUser } from "../RedditPosts";

export type DiscordSendStatus = "SUCCESS" | "FAILED"

export interface SendDiscordOptions {
  post: RedditPost
  user: RedditUser,
  webhookURL: string
}

export interface ISendDiscord {
  exec(options: SendDiscordOptions): Promise<DiscordSendStatus>
}
