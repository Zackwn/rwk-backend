export type RedditPost = {
  url: string
}

export interface getRedditPostsParams {
  subreddit: string,
  limit: number,
  accessToken: string
}

export interface IRedditPosts {
  getBySubreddit(params: getRedditPostsParams): Promise<RedditPost[]>
}