from .tweets import like, tweet


def init_routes(api):
    api.add_resource(tweet.TweetListByUser, '/tweets-by-user/<string:login>')
    api.add_resource(tweet.Tweet, '/tweet', '/tweet/<int:tweet_id>')
    api.add_resource(tweet.ExploreTweets, '/explore/tweets')
    api.add_resource(like.TweetLike, '/like/tweet/<int:tweet_id>')
