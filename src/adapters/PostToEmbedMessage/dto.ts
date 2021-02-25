import { RedditPost, RedditUser } from "../../services/RedditPosts";

export interface PostToEmbedMessageDTO {
  redditPost: RedditPost,
  redditUser: RedditUser
}