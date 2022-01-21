import { TrendI } from '~/interfaces/trend.interface';
import { TweetI } from '~/interfaces/tweet.interface';
import { ExploreStateI } from '~/store/explore/state';

export enum ExploreMutation {
  SetIsLoadingTrends = 'setIsLoadingTrends',
  SetIsLoadingTweets = 'setIsLoadingTweets',
  SetTrends = 'setTrends',
  SetTweets = 'setTweets',
  ToggleTweetLike = 'toggleTweetLike',
}

export default {
  [ExploreMutation.SetIsLoadingTrends]: (state: ExploreStateI, flag: boolean) => {
    state.isLoadingTrends = flag;
  },
  [ExploreMutation.SetIsLoadingTweets]: (state: ExploreStateI, flag: boolean) => {
    state.isLoadingTweets = flag;
  },
  [ExploreMutation.SetTrends]: (state: ExploreStateI, trends: TrendI[]) => {
    state.trends = trends;
  },
  [ExploreMutation.SetTweets]: (state: ExploreStateI, tweets: TweetI[]) => {
    state.tweets = tweets;
  },
  [ExploreMutation.ToggleTweetLike]: (state: ExploreStateI, { tweetId, isLike }: { tweetId: number, isLike: boolean }) => {
     const tweet = state.tweets.find(({ id }) => id === tweetId);

     if (!tweet) {
       throw Error(`There is no tweet with id ${tweetId}`);
     }

     tweet.likes.isLikedByMe = isLike;
     tweet.likes.total = tweet.likes.total + (isLike ? 1 : -1);
  },
};
