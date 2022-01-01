from flask_restful import Resource, reqparse
from models.user import UserModel
from reqparsers.pagination import parse_pagination

class TweetListByUser(Resource):
    def get(self, login):
        pagination = parse_pagination(reqparse.RequestParser())

        user = UserModel.query.filter_by(login=login).first()

        if not user:
            return {'message': 'User with this login is not found.'}, 404

        paginated_tweets = user.tweets.offset(pagination['skip']).limit(pagination['limit'])
        total = user.tweets.count()
        has_next_page = total - (pagination['page'] * pagination['limit']) > 0

        return {
            'tweets': [t.json() for t in paginated_tweets],
            'pagination': {
                'page': pagination['page'],
                'limit': pagination['limit'],
                'total': total,
                'hasNextPage': has_next_page
            }
        }
