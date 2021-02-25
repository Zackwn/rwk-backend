import { PostToEmbedMessageDTO } from "./dto";
import { EmbedMessage } from "./embedMessage";

export interface IPostToEmbedMessage {
  exec(dto: PostToEmbedMessageDTO): EmbedMessage
}