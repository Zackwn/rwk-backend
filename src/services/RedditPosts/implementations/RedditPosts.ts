import { IRedditPosts, getRedditPostsParams, RedditPost } from '../index'

import fetch from 'isomorphic-unfetch'

export class RedditPosts implements IRedditPosts {
  public async getBySubreddit({ subreddit, limit }: getRedditPostsParams) {
    // https://www.reddit.com/r/redditdev/top.json
    const url = `https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}`
    console.log({ redditPostsurl: url })
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'UTF-8',
        'User-Agent': 'testing rwk v1.0 (by /u/Zackwn)'
      }
    })
    const res = await response.json()
    console.log({ redditResLength: res.data.dist })
    return res.data.children.map((posts: any) => {
      return posts.data.url || posts.data.url_overridden_by_dest
    }) as RedditPost[]
  }
}