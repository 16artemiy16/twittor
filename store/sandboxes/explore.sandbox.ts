import { createNamespacedHelpers } from 'vuex'
import { ExploreAction } from '~/store/explore';

const { mapState, mapActions } = createNamespacedHelpers('explore');

export const computed = {
  ...mapState([
    'isLoadingTrends',
    'isLoadingTweets',
    'trends',
    'tweets',
  ]),
};

export const actions = {
  ...mapActions([
    ExploreAction.FetchTrends,
    ExploreAction.FetchTweets
  ]),
};
