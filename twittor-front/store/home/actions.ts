import { ActionContext } from 'vuex';
import { HomeStateI } from '~/store/home/state';
import { HomeMutation } from '~/store/home/mutations';

type HomeActionContext = ActionContext<HomeStateI, any>

export enum HomeAction {
  FetchTweets = 'fetchTweets',
  ToggleTweetLike = 'toggleTweetLike',
}

export default {
  async [HomeAction.FetchTweets]({ commit }: HomeActionContext) {
    commit(HomeMutation.SetIsLoadingTweets, true);
    try {
      // TODO: getExploreTweets() for now, replace in future
      const tweets = await this.$tweetsService.getExploreTweets();
      commit(HomeMutation.SetTweets, tweets);
    } catch (err) {

    } finally {
      commit(HomeMutation.SetIsLoadingTweets, false);
    }
  },
  async [HomeAction.ToggleTweetLike](
    { commit, state }: HomeActionContext,
    tweetId: number,
  ) {
    const tweet = (state as HomeStateI).tweets.find(({ id }) => id === tweetId);

    if (!tweet) {
      throw Error(`No tweet with such id (${tweetId})`)
    }

    const isLike = !tweet.likes.isLikedByMe;

    commit(HomeMutation.ToggleTweetLike, { tweetId, isLike });
    try {
      await this.$tweetsService.toggleTweetLike(tweetId);
    } catch (err) {
      commit(HomeMutation.ToggleTweetLike, { tweetId, isLike: !isLike });
    }
  }
} as any;
