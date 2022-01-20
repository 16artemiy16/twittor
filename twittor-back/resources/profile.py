from flask_restful import Resource
from flask_jwt_extended import jwt_required
from models.user import UserModel
from models.tweet import TweetModel


class Profile(Resource):
    @jwt_required()
    def get(self, login):
        user = UserModel.find_by_login(login)

        if not user:
            return {'message': 'User with this login does not exist'}, 404

        profile = user.json()
        profile['stats'] = {
            'tweets': TweetModel.count_by_user_id(user.id)
        }

        return {'profile': profile}
