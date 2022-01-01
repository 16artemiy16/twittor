from flask_restful import Resource, reqparse
from models.user import UserModel


class TweetListByUser(Resource):
    def get(self, login):
        parser = reqparse.RequestParser()
        parser.add_argument('limit', type=int, help='Limit should be integer', default=10)
        parser.add_argument('page', type=int, help='Page should be integer', default=0)

        args = parser.parse_args()

        limit = args['limit']
        skip = (args['page'] - 1) * limit

        user = UserModel.query.filter_by(login=login).first()
        paginated_tweets = user.tweets.offset(skip).limit(limit)

        if not user:
            return {'message': 'User with this login is not found.'}, 404
        return {'tweets': [t.json() for t in paginated_tweets]}
