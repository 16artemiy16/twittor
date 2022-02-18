from . import like, tweet, explore_tweets, tweet_list_by_user


def init_routes(api):
    api.add_resource(tweet.Tweet, '/tweet', '/tweet/<int:tweet_id>')
    api.add_resource(like.TweetLike, '/like/tweet/<int:tweet_id>')
    api.add_resource(tweet_list_by_user.TweetListByUser, '/tweets-by-user/<string:login>')
    api.add_resource(explore_tweets.ExploreTweets, '/explore/tweets')
