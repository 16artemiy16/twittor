import { createNamespacedHelpers } from 'vuex'
import { ExploreAction } from '~/store/explore/actions';

const { mapState, mapActions } = createNamespacedHelpers('explore');

export const computed = {
  ...mapState([
    'isLoadingTrends',
    'isLoadingTweets',
    'trends',
    'tweets',
  ]),
} as Record<'isLoadingTrends' | 'isLoadingTweets' | 'trends' | 'tweets', any>;

export const actions = {
  ...mapActions([
    ExploreAction.FetchTrends,
    ExploreAction.FetchTweets
  ]),
} as Record<ExploreAction.FetchTrends | ExploreAction.FetchTweets, Function>;
