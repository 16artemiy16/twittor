import { createNamespacedHelpers } from 'vuex';
import { HomeAction } from '~/store/home/actions';

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('home');

export const computed = {
  ...mapState([
    'isLoadingTweets',
    'isTweetSending',
    'lastCreatedTweet'
  ]),
  ...mapGetters([
    'tweets'
  ]),
} as Record<'isLoadingTweets' | 'tweets' | 'isTweetSending' | 'lastCreatedTweet', any>;

export const actions = {
  ...mapActions([
    HomeAction.ToggleTweetLike,
    HomeAction.FetchTweets,
    HomeAction.CreateTweet,
    HomeAction.RemoveTweet,
  ]),
} as Record<
  HomeAction.ToggleTweetLike |
  HomeAction.FetchTweets |
  HomeAction.CreateTweet |
  HomeAction.RemoveTweet,
  Function>;
