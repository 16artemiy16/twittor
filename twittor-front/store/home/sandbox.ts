import { createNamespacedHelpers } from 'vuex';
import { HomeAction } from '~/store/home/actions';

const { mapState, mapActions } = createNamespacedHelpers('home');

export const computed = {
  ...mapState([
    'isLoadingTweets',
    'tweets'
  ]),
} as Record<'isLoadingTweets' | 'tweets', any>;

export const actions = {
  ...mapActions([
    HomeAction.ToggleTweetLike,
    HomeAction.FetchTweets,
  ]),
} as Record<HomeAction.ToggleTweetLike | HomeAction.FetchTweets, Function>;
