import { UserProfileI } from '~/interfaces/user-profile.interface';
import { TweetI } from '~/interfaces/tweet.interface';

export interface ProfileStateI {
  isLoadingProfileInfo: boolean;
  isLoadingTweets: boolean;
  tweets: TweetI[];
  profileInfo: UserProfileI | undefined;
  isProfileEditModalOpened: boolean;
}

export default (): ProfileStateI => ({
  isLoadingProfileInfo: false,
  isLoadingTweets: false,
  tweets: [],
  profileInfo: undefined,
  isProfileEditModalOpened: false,
});
