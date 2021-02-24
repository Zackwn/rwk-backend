export type RedditPost = {
  url: string
}

export interface RedditUser {
  id: string,
  name: string
  url: string,
  profilePictureURL: string
}

export interface getRedditPostsParams {
  subreddit: string,
  limit: number,
  accessToken: string
}

export interface getMeParams {
  accessToken: string
}

export interface IRedditAPI {
  getMe(params: getMeParams): Promise<RedditUser | null>
  getByPostsSubreddit(params: getRedditPostsParams): Promise<RedditPost[]>
}