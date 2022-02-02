import { TweetI } from '~/interfaces/tweet.interface';
import { HomeStateI } from '~/store/home/state';
import { ExploreMutation } from '~/store/explore/mutations';

export enum HomeMutation {
  SetIsLoadingTweets= 'setIsLoadingTweets',
  SetTweets = 'setTweets',
  ToggleTweetLike = 'toggleTweetLike',
}

export default {
  [HomeMutation.SetIsLoadingTweets]: (state: HomeStateI, flag: boolean) => {
    state.isLoadingTweets = flag;
  },
  [HomeMutation.SetTweets]: (state: HomeStateI, tweets: TweetI[]) => {
    state.tweets = tweets;
  },
  [ExploreMutation.ToggleTweetLike]: (state: HomeStateI, { tweetId, isLike }: { tweetId: number, isLike: boolean }) => {
    const tweet = state.tweets.find(({ id }) => id === tweetId);

    if (!tweet) {
      throw Error(`There is no tweet with id ${tweetId}`);
    }

    tweet.likes.isLikedByMe = isLike;
    tweet.likes.total = tweet.likes.total + (isLike ? 1 : -1);
  },
}
