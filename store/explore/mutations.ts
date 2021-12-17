import { TrendI } from '~/interfaces/trend.interface';
import { TweetI } from '~/interfaces/tweet.interface';
import { ExploreStateI } from '~/store/explore/state';

export enum ExploreMutation {
  SetIsLoadingTrends = 'setIsLoadingTrends',
  SetIsLoadingTweets = 'setIsLoadingTweets',
  SetTrends = 'setTrends',
  SetTweets = 'setTweets',
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
};
