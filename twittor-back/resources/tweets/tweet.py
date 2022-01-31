from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.user import UserModel
from models.tweet import TweetModel
from reqparsers.types import non_empty_string


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

    @jwt_required()
    def delete(self, tweet_id):
        tweet = TweetModel.find_by_id(tweet_id)

        if not tweet:
            return {'message': 'There is no tweet with this id'}, 404

        user = UserModel.find_by_id(get_jwt_identity())

        if user.id != tweet.user_id:
            return {'message': 'You can\'t delete this tweet'}, 400

        tweet.delete_from_db()

        return {'message': 'The tweet have been successfully removed'}
