import { ProfileStateI } from '~/store/profile/state';
import { UserProfileI } from '~/interfaces/user-profile.interface';
import { TweetI } from '~/interfaces/tweet.interface';

export enum ProfileMutation {
  SetIsLoadingProfileInfo = 'setIsLoadingProfileInfo',
  SetIsLoadingTweets = 'setIsLoadingTweets',
  SetProfileInfo = 'setProfileInfo',
  SetTweets = 'setTweets',
  ToggleTweetLike = 'toggleTweetLike',
}

export default {
  [ProfileMutation.SetIsLoadingProfileInfo]: (state: ProfileStateI, flag: boolean) => {
    state.isLoadingProfileInfo = flag;
  },
  [ProfileMutation.SetIsLoadingTweets]: (state: ProfileStateI, flag: boolean) => {
    state.isLoadingTweets = flag;
  },
  [ProfileMutation.SetProfileInfo]: (state: ProfileStateI, profileInfo: UserProfileI) => {
    state.profileInfo = profileInfo;
  },
  [ProfileMutation.SetTweets]: (state: ProfileStateI, tweets: TweetI[]) => {
    state.tweets = tweets;
  },
  [ProfileMutation.ToggleTweetLike]: (state: ProfileStateI, { tweetId, isLike }: { tweetId: number, isLike: boolean }) => {
    const tweet = state.tweets.find(({ id }) => id === tweetId);

    if (!tweet) {
      throw Error(`There is no tweet with id ${tweetId}`);
    }

    tweet.likes.isLikedByMe = isLike;
    tweet.likes.total = tweet.likes.total + (isLike ? 1 : -1);
  }
}
