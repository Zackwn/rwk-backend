export type DiscordSendStatus = "SUCCESS" | "FAILED"

export interface ISendDiscord {
  send(webhookURL: string, content: any): Promise<DiscordSendStatus>
}
