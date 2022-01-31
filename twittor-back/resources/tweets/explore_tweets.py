from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.tweet import TweetModel
from models.user import UserModel
from reqparsers.pagination import parse_pagination
from .utils import add_likes_details


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
            'tweets': [add_likes_details(t.json(), get_jwt_identity()) for t in paginated_tweets],
            'pagination': {
                'page': pagination['page'],
                'limit': pagination['limit'],
                'total': total,
                'hasNextPage': has_next_page
            }
        }
