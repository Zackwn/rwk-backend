import { IPostToEmbedMessage } from "..";
import { PostToEmbedMessageDTO } from "../dto";
import { EmbedMessage } from "../embedMessage";

export class PostToEmbedMessage implements IPostToEmbedMessage {
  public exec(dto: PostToEmbedMessageDTO) {
    const embedMessage: EmbedMessage = {
      author: {
        name: dto.redditUser.name,
        icon_url: dto.redditUser.profilePictureURL
      }
    }
    if (dto.redditPost.isMedia) {
      embedMessage.image = { url: dto.redditPost.url }
    } else {
      embedMessage.description = dto.redditPost.url
    }
    return embedMessage
  }
}