import { TweetI } from '~/interfaces/tweet.interface';
import { HomeStateI } from '~/store/home/state';


export enum HomeMutation {
  SetIsLoadingTweets= 'setIsLoadingTweets',
  SetIsTweetSending = 'setIsTweetSending',
  SetTweets = 'setTweets',
  ToggleTweetLike = 'toggleTweetLike',
  AddTweet = 'addTweet',
  SetLastCreatedTweet = 'setLastCreatedTweet',
}

export default {
  [HomeMutation.SetIsLoadingTweets]: (state: HomeStateI, flag: boolean) => {
    state.isLoadingTweets = flag;
  },
  [HomeMutation.SetTweets]: (state: HomeStateI, tweets: TweetI[]) => {
    state.tweets = tweets;
  },
  [HomeMutation.ToggleTweetLike]: (state: HomeStateI, { tweetId, isLike }: { tweetId: number, isLike: boolean }) => {
    const tweet = state.tweets.find(({ id }) => id === tweetId);

    if (!tweet) {
      throw Error(`There is no tweet with id ${tweetId}`);
    }

    tweet.likes.isLikedByMe = isLike;
    tweet.likes.total = tweet.likes.total + (isLike ? 1 : -1);
  },
  [HomeMutation.AddTweet]: (state: HomeStateI, tweet: TweetI) => {
    state.tweets.push(tweet);
  },
  [HomeMutation.SetIsTweetSending]: (state: HomeStateI, flag: boolean) => {
    state.isTweetSending = flag;
  },
  [HomeMutation.SetLastCreatedTweet]: (state: HomeStateI, tweet: TweetI) => {
    state.lastCreatedTweet = tweet;
  },
}
