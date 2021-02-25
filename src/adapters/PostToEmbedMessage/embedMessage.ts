export interface EmbedMessage {
  image?: {
    url: string
  },
  description?: string
  author: {
    name: string
    icon_url: string
  }
}