import { IRedditPosts, getRedditPostsParams, RedditPost } from '../index'
import fetch from 'isomorphic-unfetch'
import { __PROD__ } from '../../../constants'

export class RedditPosts implements IRedditPosts {
  public async getBySubreddit({ subreddit: _, limit, accessToken }: getRedditPostsParams) {
    // https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}
    // https://oauth.reddit.com/.json?count=5&limit=50
    const url = `https://oauth.reddit.com/.json?limit=${limit}`
    console.log({ redditPostsurl: url })
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'UTF-8',
        'User-Agent': `${__PROD__ ? '' : 'testing'}rwk v1.0 (by /u/Zackwn)`,
        'authorization': `Bearer ${accessToken}`
      }
    })
    const res = await response.json()
    console.log({ redditResLength: res.data.dist })
    return res.data.children.map((posts: any) => {
      return posts.data.url || posts.data.url_overridden_by_dest
    }) as RedditPost[]
  }
}