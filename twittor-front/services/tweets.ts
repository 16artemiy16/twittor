import { TweetI } from '~/interfaces/tweet.interface';
import { Inject } from '@nuxt/types/app';
import Vue from 'vue';

export interface TweetsServiceI {
  getUserTweets: (userId: string, pagination?: { page: number, size: number }) => Promise<TweetI[]>
}

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

export const toggleTweetLike = async (tweedId: string, isLike: boolean): Promise<void> => {

};

export default ({ $axios }: Vue, inject: Inject) => {
  const tweetsService: TweetsServiceI = {
    getUserTweets: async (userId: string, { page, size } = { page: 1, size: 10 }) => {
      const { data } = await $axios.get(`/tweets-by-user/${userId}`);
      return data.tweets;
    },
  };

  inject('tweetsService', tweetsService);
};

