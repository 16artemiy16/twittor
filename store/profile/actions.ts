import { ActionContext } from 'vuex';
import { ProfileStateI } from '~/store/profile/state';
import { getUserProfile } from '~/services/users';
import { ProfileMutation } from '~/store/profile/mutations';
import { getTweets } from '~/services/tweets';

type ProfileActionContext = ActionContext<ProfileStateI, any>

export enum ProfileAction {
  InitProfile = 'initProfile',
  FetchTweets = 'fetchTweets',
  FetchProfileInfo = 'fetchProfileInfo',
}

export default {
  [ProfileAction.InitProfile]: ({ dispatch }: ProfileActionContext, userId: string) => {
    dispatch(ProfileAction.FetchProfileInfo, userId);
    dispatch(ProfileAction.FetchTweets, userId);
  },
  [ProfileAction.FetchProfileInfo]: async ({ commit }: ProfileActionContext, userId: string) => {
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
  [ProfileAction.FetchTweets]: async ({ commit }: ProfileActionContext, userId: string) => {
    commit(ProfileMutation.SetIsLoadingTweets, true);
    try {
      const tweets = await getTweets(userId);
      commit(ProfileMutation.SetTweets, tweets);
    } catch (e) {
      // TODO: handle error
    } finally {
      commit(ProfileMutation.SetIsLoadingTweets, false);
    }
  }
}
