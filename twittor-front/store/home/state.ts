import { TweetI } from '~/interfaces/tweet.interface';

export interface HomeStateI {
  isLoadingTweets: boolean;
  isTweetSending: boolean;
  tweets: TweetI[];
  lastCreatedTweet: TweetI | undefined;
}

export default (): HomeStateI => ({
  isLoadingTweets: false,
  isTweetSending: false,
  tweets: [],
  lastCreatedTweet: undefined,
});
