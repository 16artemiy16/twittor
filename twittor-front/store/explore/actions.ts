import { getTrends } from '~/services/trends';
import { ExploreMutation } from '~/store/explore/mutations';
import { ActionContext } from 'vuex';
import { ExploreStateI } from '~/store/explore/state';

type ExploreActionContext = ActionContext<ExploreStateI, any>;

export enum ExploreAction {
  FetchTrends = 'fetchTrends',
  FetchTweets = 'fetchTweets',
  ToggleTweetLike = 'toggleTweetLike',
}

export default {
  async [ExploreAction.FetchTrends]({ commit }: ExploreActionContext) {
    commit(ExploreMutation.SetIsLoadingTrends, true);
    try {
      const trends = await getTrends();
      commit(ExploreMutation.SetTrends, trends);
    } catch (err) {

    } finally {
      commit(ExploreMutation.SetIsLoadingTrends, false);
    }
  },
  async [ExploreAction.FetchTweets]({ commit }: ExploreActionContext) {
    commit(ExploreMutation.SetIsLoadingTweets, true);
    try {
      const tweets = await this.$tweetsService.getExploreTweets();
      commit(ExploreMutation.SetTweets, tweets);
    } catch (err) {

    } finally {
      commit(ExploreMutation.SetIsLoadingTweets, false);
    }
  },
  async [ExploreAction.ToggleTweetLike](
    { commit, state }: ExploreActionContext,
    tweetId: string,
  ) {
    const tweet = (state as ExploreStateI).tweets.find(({ id }) => id === tweetId);

    if (!tweet) {
      throw Error(`No tweet with such id (${tweetId})`)
    }

    const isLike = !tweet.likes.isLikedByMe;

    commit(ExploreMutation.ToggleTweetLike, { tweetId, isLike });
    try {
      await this.$tweetsService.toggleTweetLike(tweetId);
    } catch (err) {
      commit(ExploreMutation.ToggleTweetLike, { tweetId, isLike: !isLike });
    }
  }
} as any;
