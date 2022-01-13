import { TweetI } from '~/interfaces/tweet.interface';
import { Inject } from '@nuxt/types/app';
import Vue from 'vue';

interface PaginationI { page: number, size: number }

export interface TweetsServiceI {
  getUserTweets: (userId: string, pagination?: PaginationI) => Promise<TweetI[]>,
  getExploreTweets: (pagination?: PaginationI) => Promise<TweetI[]>,
  toggleTweetLike: (id: string) => Promise<void>,
}

const DEFAULT_PAGINATION: PaginationI = { page: 1, size: 10 };

export const getTweets = (userId?: string): Promise<TweetI[]> => {
  const DELAY = 500;
  const data: TweetI[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (    {
    id: `${num}`,
    body: `Hi there! This is my tweet number ${num}!`,
    user: { name: 'John Snow', login: '@john-snow', img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg' },
    likes: {
      total: num,
      isLikedByMe: num % 2 === 0,
    },
  }));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, DELAY)
  });
};

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
  };

  inject('tweetsService', tweetsService);
};

