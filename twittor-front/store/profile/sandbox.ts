import { createNamespacedHelpers } from 'vuex';
import { ProfileAction } from '~/store/profile/actions';
import { ProfileMutation } from '~/store/profile/mutations';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('profile');

export const computed = {
  ...mapState([
    'isLoadingTweets',
    'isLoadingProfileInfo',
    'profileInfo',
    'tweets',
    'isProfileEditModalOpened'
  ]),
} as Record<'isLoadingTweets' | 'isLoadingProfileInfo' | 'profileInfo' | 'tweets' | 'isProfileEditModalOpened', any>;

export const actions = {
  ...mapActions([
    ProfileAction.InitProfile,
    ProfileAction.FetchProfileInfo,
    ProfileAction.FetchTweets,
    ProfileAction.ToggleTweetLike,
  ]),
} as Record<
  ProfileAction.InitProfile |
  ProfileAction.FetchProfileInfo |
  ProfileAction.FetchTweets |
  ProfileAction.ToggleTweetLike,
  Function
>;

export const mutations = {
  ...mapMutations([
    ProfileMutation.ToggleProfileEdit,
  ]),
} as Record<ProfileMutation.ToggleProfileEdit, Function>
