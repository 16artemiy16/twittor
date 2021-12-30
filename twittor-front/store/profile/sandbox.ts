import { createNamespacedHelpers } from 'vuex';
import { ProfileAction } from '~/store/profile/actions';

const { mapState, mapActions } = createNamespacedHelpers('profile');

export const computed = {
  ...mapState([
    'isLoadingTweets',
    'isLoadingProfileInfo',
    'profileInfo',
    'tweets'
  ]),
} as Record<'isLoadingTweets' | 'isLoadingProfileInfo' | 'profileInfo' | 'tweets', any>;

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
