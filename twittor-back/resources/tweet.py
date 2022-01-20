from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.user import UserModel
from models.tweet import TweetModel
from models.like import LikeModel
from reqparsers.pagination import parse_pagination
from reqparsers.types import non_empty_string


def _add_likes_details(data, user_id):
    data['likes'] = {
        'total': LikeModel.get_count_in_tweet(data['id']),
        'isLikedByMe': LikeModel.is_tweet_liked_by_user(data['id'], user_id)
    }
    return data


class TweetListByUser(Resource):
    @jwt_required()
    def get(self, login):
        pagination = parse_pagination(reqparse.RequestParser())

        user = UserModel.find_by_login(login)

        if not user:
            return {'message': 'User with this login is not found.'}, 404

        paginated_tweets = user.tweets.order_by(TweetModel.created.desc()).offset(pagination['skip']).limit(pagination['limit'])
        total = user.tweets.count()
        has_next_page = total - (pagination['page'] * pagination['limit']) > 0

        return {
            'tweets': [_add_likes_details(t.json(), get_jwt_identity()) for t in paginated_tweets],
            'pagination': {
                'page': pagination['page'],
                'limit': pagination['limit'],
                'total': total,
                'hasNextPage': has_next_page
            }
        }


class Tweet(Resource):
    def __parse_post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('body', required=True, type=non_empty_string, help='Body is required')
        return parser.parse_args()

    @jwt_required()
    def post(self):
        data = self.__parse_post()

        tweet = TweetModel(data['body'])
        tweet.user_id = get_jwt_identity()
        tweet.save_to_db()

        return {'tweet': tweet.json()}


class ExploreTweets(Resource):
    # TODO: this is mocked for now to return the user's tweets
    @jwt_required()
    def get(self):
        pagination = parse_pagination(reqparse.RequestParser())

        user = UserModel.find_by_id(get_jwt_identity())

        paginated_tweets = user.tweets.order_by(TweetModel.created.desc()).offset(pagination['skip']).limit(pagination['limit'])
        total = user.tweets.count()
        has_next_page = total - (pagination['page'] * pagination['limit']) > 0

        return {
            'tweets': [_add_likes_details(t.json(), get_jwt_identity()) for t in paginated_tweets],
            'pagination': {
                'page': pagination['page'],
                'limit': pagination['limit'],
                'total': total,
                'hasNextPage': has_next_page
            }
        }
