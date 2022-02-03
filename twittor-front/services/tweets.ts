import { TweetI } from '~/interfaces/tweet.interface';
import { Inject } from '@nuxt/types/app';
import Vue from 'vue';
import { CreateTweetDto } from '~/dtos/create-tweet.dto';

interface PaginationI { page: number, size: number }


export interface TweetsServiceI {
  getUserTweets: (login: string, pagination?: PaginationI) => Promise<TweetI[]>,
  getExploreTweets: (pagination?: PaginationI) => Promise<TweetI[]>,
  toggleTweetLike: (id: string) => Promise<void>,
  postTweet: (data: CreateTweetDto) => Promise<void>,
  removeTweet: (id: number) => Promise<void>,
}

const DEFAULT_PAGINATION: PaginationI = { page: 1, size: 10 };

export default ({ $axios }: Vue, inject: Inject) => {
  const tweetsService: TweetsServiceI = {
    getUserTweets: async (login, { page, size } = DEFAULT_PAGINATION) => {
      const { data } = await $axios.get(`/tweets-by-user/${login}`, { params: { page, size } });
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
      const res = await $axios.post('/tweet', { body });
      return res.data;
    },
    removeTweet: async (id) => {
      await $axios.delete(`/tweet/${id}`);
    },
  };

  inject('tweetsService', tweetsService);
};

