import { TweetI } from '~/interfaces/tweet.interface';

export const getTweets = (): Promise<TweetI[]> => {
  const DELAY = 1500;
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (    {
    id: `${num}`,
    body: `Hi there! This is my tweet number ${num}!`,
    user: { name: 'John Snow', login: '@john-snow', img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg' }
  }));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, DELAY)
  })
};
