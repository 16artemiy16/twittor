import { ActionContext } from 'vuex';
import { ProfileStateI } from '~/store/profile/state';
import { ProfileMutation } from '~/store/profile/mutations';

type ProfileActionContext = ActionContext<ProfileStateI, ProfileStateI>

export enum ProfileAction {
  InitProfile = 'initProfile',
  FetchTweets = 'fetchTweets',
  FetchProfileInfo = 'fetchProfileInfo',
  ToggleTweetLike = 'toggleTweetLike',
}

export default {
  [ProfileAction.InitProfile]({ dispatch }: ProfileActionContext, login: string) {
    dispatch(ProfileAction.FetchProfileInfo, login);
    dispatch(ProfileAction.FetchTweets, login);
  },
  async [ProfileAction.FetchProfileInfo]({ commit }: ProfileActionContext, login: string) {
    commit(ProfileMutation.SetIsLoadingProfileInfo, true);
    try {
      const profile = await this.$usersService.getUserProfile(login);
      commit(ProfileMutation.SetProfileInfo, profile);
    } catch (e) {
      // TODO: handle error
    } finally {
      commit(ProfileMutation.SetIsLoadingProfileInfo, false);
    }
  },
  async [ProfileAction.FetchTweets]({ commit }: ProfileActionContext, login: string) {
    commit(ProfileMutation.SetIsLoadingTweets, true);
    try {
      const tweets = await this.$tweetsService.getUserTweets(login);
      commit(ProfileMutation.SetTweets, tweets);
    } catch (e) {
      // TODO: handle error
    } finally {
      commit(ProfileMutation.SetIsLoadingTweets, false);
    }
  },
  async [ProfileAction.ToggleTweetLike](
    { commit, state }: ProfileActionContext,
    tweetId: number,
  ) {
    const tweet = (state as ProfileStateI).tweets.find(({ id }) => id === tweetId);

    if (!tweet) {
      throw Error(`No tweet with such id (${tweetId})`)
    }

    const isLike = !tweet.likes.isLikedByMe;

    commit(ProfileMutation.ToggleTweetLike, { tweetId, isLike });
    try {
      await this.$tweetsService.toggleTweetLike(tweetId);
    } catch (err) {
      commit(ProfileMutation.ToggleTweetLike, { tweetId, isLike: !isLike });
    }
  }
} as any;
