import { TrendI } from '~/interfaces/trend.interface';

export const getTrends = (): Promise<TrendI[]> => {
  const DELAY = 500;
  const trends = [1, 2, 3].map((num) => ({ id: `${num}`, title: `Trend #${num}` }));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(trends)
    }, DELAY)
  })
};
