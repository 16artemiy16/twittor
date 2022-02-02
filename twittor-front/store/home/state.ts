import { TweetI } from '~/interfaces/tweet.interface';

export interface HomeStateI {
  isLoadingTweets: boolean;
  tweets: TweetI[];
}

export default (): HomeStateI => ({
  isLoadingTweets: false,
  tweets: [],
});
