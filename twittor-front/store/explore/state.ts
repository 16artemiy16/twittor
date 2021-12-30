import { TrendI } from '~/interfaces/trend.interface';
import { TweetI } from '~/interfaces/tweet.interface';

export interface ExploreStateI {
  isLoadingTrends: boolean,
  isLoadingTweets: boolean,
  trends: TrendI[],
  tweets: TweetI[],
}

export default (): ExploreStateI => ({
  isLoadingTrends: false,
  isLoadingTweets: false,
  trends: [],
  tweets: [],
});
