import { HomeStateI } from '~/store/home/state';
import { TweetI } from '~/interfaces/tweet.interface';

export default {
  tweets: (state: HomeStateI): TweetI[] => {
    return [...state.tweets].sort((a, b) => b.created - a.created);
  }
}
