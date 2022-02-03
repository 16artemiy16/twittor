import { createNamespacedHelpers } from 'vuex';
import { HomeAction } from '~/store/home/actions';

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('home');

export const computed = {
  ...mapState([
    'isLoadingTweets',
    'isTweetSending'
  ]),
  ...mapGetters([
    'tweets'
  ]),
} as Record<'isLoadingTweets' | 'tweets' | 'isTweetSending', any>;

export const actions = {
  ...mapActions([
    HomeAction.ToggleTweetLike,
    HomeAction.FetchTweets,
    HomeAction.CreateTweet
  ]),
} as Record<HomeAction.ToggleTweetLike | HomeAction.FetchTweets | HomeAction.CreateTweet, Function>;
