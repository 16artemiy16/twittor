import { ActionContext } from 'vuex';
import { ProfileStateI } from '~/store/profile/state';
import { getUserProfile } from '~/services/users';
import { ProfileMutation } from '~/store/profile/mutations';
import { toggleTweetLike } from '~/services/tweets';

type ProfileActionContext = ActionContext<ProfileStateI, any>

export enum ProfileAction {
  InitProfile = 'initProfile',
  FetchTweets = 'fetchTweets',
  FetchProfileInfo = 'fetchProfileInfo',
  ToggleTweetLike = 'toggleTweetLike',
}

export default {
  [ProfileAction.InitProfile]({ dispatch }: ProfileActionContext, userId: string) {
    dispatch(ProfileAction.FetchProfileInfo, userId);
    dispatch(ProfileAction.FetchTweets, userId);
  },
  async [ProfileAction.FetchProfileInfo]({ commit }: ProfileActionContext, userId: string) {
    commit(ProfileMutation.SetIsLoadingProfileInfo, true);
    try {
      const profile = await getUserProfile(userId);
      commit(ProfileMutation.SetProfileInfo, profile);
    } catch (e) {
      // TODO: handle error
    } finally {
      commit(ProfileMutation.SetIsLoadingProfileInfo, false);
    }
  },
  async [ProfileAction.FetchTweets]({ commit }: ProfileActionContext, userId: string) {
    commit(ProfileMutation.SetIsLoadingTweets, true);
    try {
      const tweets = await this.$tweetsService.getUserTweets(userId);
      commit(ProfileMutation.SetTweets, tweets);
    } catch (e) {
      // TODO: handle error
    } finally {
      commit(ProfileMutation.SetIsLoadingTweets, false);
    }
  },
  [ProfileAction.ToggleTweetLike]: async (
    { commit }: ProfileActionContext,
    { tweetId, isLike }: { tweetId: string, isLike: boolean }
  ) => {
    commit(ProfileMutation.ToggleTweetLike, { tweetId, isLike });
    try {
      await toggleTweetLike(tweetId, isLike);
    } catch (err) {
      commit(ProfileMutation.ToggleTweetLike, { tweetId, isLike: !isLike });
    }
  }
} as any;
