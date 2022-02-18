from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from flasgger import swag_from

from application.models import TweetModel
from application.reqparsers import parse_pagination
from .utils import add_likes_details


class ExploreTweets(Resource):
    @jwt_required()
    @swag_from('explore_tweets.yaml')
    def get(self):
        pagination = parse_pagination(reqparse.RequestParser())

        paginated_tweets = TweetModel.query \
            .filter(TweetModel.user_id != get_jwt_identity()) \
            .order_by(TweetModel.created.desc()) \
            .offset(pagination['skip']) \
            .limit(pagination['limit'])

        return {
            'tweets': [add_likes_details(t.json(), get_jwt_identity()) for t in paginated_tweets],
            'pagination': {
                'page': pagination['page'],
                'limit': pagination['limit'],
            }
        }
