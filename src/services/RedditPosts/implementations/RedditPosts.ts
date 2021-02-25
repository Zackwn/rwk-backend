import { IRedditAPI, getRedditPostsParams, RedditPost, RedditUser, getMeParams } from '../index'
import fetch from 'isomorphic-unfetch'
import { __PROD__ } from '../../../constants'

interface _RequestOptions {
  accessToken: string,
  url: string,
  method: 'GET' | 'POST'
}

export class RedditPosts implements IRedditAPI {
  private readonly mediaCheckWords: string[] = [
    ".jpg", ".png", ".gif", ".webm", "imgur.com", "gfycat.com"
  ]

  private async request(options: _RequestOptions) {
    const response = await fetch(options.url, {
      method: options.method,
      headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'UTF-8',
        'User-Agent': `${__PROD__ ? '' : 'testing '}rwk v1.0 (by /u/Zackwn)`,
        'authorization': `Bearer ${options.accessToken}`
      }
    })
    return await response.json()
  }

  public async getMe(params: getMeParams): Promise<RedditUser | null> {
    const redditMeURL = "https://oauth.reddit.com/api/v1/me"

    const response = await this.request({
      accessToken: params.accessToken,
      method: 'GET',
      url: redditMeURL
    })

    if (response?.error === 403 || response?.error === 401) {
      return null
    }

    const profilePictureURL =
      String(response.icon_img).split("amp;").join('')
      || response.snoovatar_img
      || "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"

    return {
      id: response.id,
      name: response.name,
      url: `https://www.reddit.com${response.url}`,
      profilePictureURL
    }
  }

  public async getByPostsSubreddit({ subreddit: _, limit, accessToken }: getRedditPostsParams) {
    // https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}
    // https://oauth.reddit.com/.json?count=5&limit=50
    const url = `https://oauth.reddit.com/.json?limit=${limit}`

    const user = await this.getMe({ accessToken })

    console.log({ redditPostsurl: url })

    const response = await this.request({
      method: 'GET', url, accessToken
    })

    console.log({ redditResLength: response.data.dist })

    const redditPosts: RedditPost[] = []

    response.data.children.forEach((posts: any) => {
      const postURL = String(posts.data.url || posts.data.url_overridden_by_dest)
      const isMedia = !!this.mediaCheckWords.find((word) => {
        return postURL.includes(word)
      })
      redditPosts.push({
        url: postURL,
        isMedia: isMedia
      })
    })

    return redditPosts
  }
}