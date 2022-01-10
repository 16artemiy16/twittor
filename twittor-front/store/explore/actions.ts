import { getTrends } from '~/services/trends';
import { ExploreMutation } from '~/store/explore/mutations';
import { ActionContext } from 'vuex';
import { ExploreStateI } from '~/store/explore/state';
import { getTweets, toggleTweetLike } from '~/services/tweets';

type ExploreActionContext = ActionContext<ExploreStateI, any>;

export enum ExploreAction {
  FetchTrends = 'fetchTrends',
  FetchTweets = 'fetchTweets',
  ToggleTweetLike = 'toggleTweetLike',
}

export default {
  [ExploreAction.FetchTrends]: async ({ commit }: ExploreActionContext) => {
    commit(ExploreMutation.SetIsLoadingTrends, true);
    try {
      const trends = await getTrends();
      commit(ExploreMutation.SetTrends, trends);
    } catch (err) {

    } finally {
      commit(ExploreMutation.SetIsLoadingTrends, false);
    }
  },
  [ExploreAction.FetchTweets]: async ({ commit }: ExploreActionContext) => {
    commit(ExploreMutation.SetIsLoadingTweets, true);
    try {
      const tweets = await getTweets();
      commit(ExploreMutation.SetTweets, tweets);
    } catch (err) {

    } finally {
      commit(ExploreMutation.SetIsLoadingTweets, false);
    }
  },
  [ExploreAction.ToggleTweetLike]: async (
    { commit }: ExploreActionContext,
    { tweetId, isLike }: { tweetId: string, isLike: boolean }
  ) => {
    commit(ExploreMutation.ToggleTweetLike, { tweetId, isLike });
    try {
      await toggleTweetLike(tweetId, isLike);
    } catch (err) {
      commit(ExploreMutation.ToggleTweetLike, { tweetId, isLike: !isLike });
    }
  }
};
