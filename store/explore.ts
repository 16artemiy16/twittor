import { getTrends } from '~/services/trends';
import { getTweets } from '~/services/tweets';
import { TrendI } from '~/interfaces/trend.interface';
import { TweetI } from '~/interfaces/tweet.interface';

export enum ExploreMutation {
  SetIsLoadingTrends = 'setIsLoadingTrends',
  SetIsLoadingTweets = 'setIsLoadingTweets',
  SetTrends = 'setTrends',
  SetTweets = 'setTweets',
}

export enum ExploreAction {
  FetchTrends = 'fetchTrends',
  FetchTweets = 'fetchTweets',
}

interface ExploreStateI {
  isLoadingTrends: boolean,
  isLoadingTweets: boolean,
  trends: TrendI[],
  tweets: TweetI[],
}

export const state = (): ExploreStateI => ({
  isLoadingTrends: false,
  isLoadingTweets: false,
  trends: [],
  tweets: [],
});

export const mutations = {
  [ExploreMutation.SetIsLoadingTrends]: (state: ExploreStateI, flag: boolean) => {
    state.isLoadingTrends = flag;
  },
  [ExploreMutation.SetIsLoadingTweets]: (state: ExploreStateI, flag: boolean) => {
    state.isLoadingTweets = flag;
  },
  [ExploreMutation.SetTrends]: (state: ExploreStateI, trends: TrendI[]) => {
    state.trends = trends;
  },
  [ExploreMutation.SetTweets]: (state: ExploreStateI, tweets: TweetI[]) => {
    state.tweets = tweets;
  },
};

export const actions = {
  [ExploreAction.FetchTrends]: async ({ commit }: any) => {
    commit(ExploreMutation.SetIsLoadingTrends, true);
    try {
      const trends = await getTrends();
      commit(ExploreMutation.SetTrends, trends);
    } catch (err) {

    } finally {
      commit(ExploreMutation.SetIsLoadingTrends, false);
    }
  },
  [ExploreAction.FetchTweets]: async ({ commit }: any) => {
    commit(ExploreMutation.SetIsLoadingTweets, true);
    try {
      const tweets = await getTweets();
      commit(ExploreMutation.SetTweets, tweets);
    } catch (err) {

    } finally {
      commit(ExploreMutation.SetIsLoadingTweets, false);
    }
  },
};


