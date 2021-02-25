import { IPostToEmbedMessage } from "../../adapters/PostToEmbedMessage";
import { PostToEmbedMessage } from "../../adapters/PostToEmbedMessage/implementations/PostToEmbedMessage";

export const generatePostToEmbedMessage = (): IPostToEmbedMessage => {
  return new PostToEmbedMessage()
}