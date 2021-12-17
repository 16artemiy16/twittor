import { getTrends } from '~/services/trends';
import { getTweets } from '~/services/tweets';
import { ExploreMutation } from '~/store/explore/mutations';
import { Action, ActionContext } from 'vuex';
import { ExploreStateI } from '~/store/explore/state';

type ExploreActionContext = ActionContext<ExploreStateI, any>;

export enum ExploreAction {
  FetchTrends = 'fetchTrends',
  FetchTweets = 'fetchTweets',
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
} ;
