import { TweetI } from '~/interfaces/tweet.interface';
import { Inject } from '@nuxt/types/app';
import Vue from 'vue';

interface PaginationI { page: number, size: number }

interface PostTweetDataI {
  body: string;
}

export interface TweetsServiceI {
  getUserTweets: (userId: string, pagination?: PaginationI) => Promise<TweetI[]>,
  getExploreTweets: (pagination?: PaginationI) => Promise<TweetI[]>,
  toggleTweetLike: (id: string) => Promise<void>,
  postTweet: (data: PostTweetDataI) => Promise<void>,
}

const DEFAULT_PAGINATION: PaginationI = { page: 1, size: 10 };

export default ({ $axios }: Vue, inject: Inject) => {
  const tweetsService: TweetsServiceI = {
    getUserTweets: async (userId, { page, size } = DEFAULT_PAGINATION) => {
      const { data } = await $axios.get(`/tweets-by-user/${userId}`, { params: { page, size } });
      return data.tweets;
    },
    getExploreTweets: async ({ page, size } = DEFAULT_PAGINATION) => {
      const { data } = await $axios.get(`/explore/tweets`, { params: { page, size } });
      return data.tweets;
    },
    toggleTweetLike: async (id) => {
      await $axios.post(`/like/tweet/${id}`);
    },
    postTweet: async ({ body }) => {
      await $axios.post('/tweet', { body });
    },
  };

  inject('tweetsService', tweetsService);
};

