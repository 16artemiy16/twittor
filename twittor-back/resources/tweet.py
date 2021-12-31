from flask_restful import Resource
from models.user import UserModel


class TweetListByUser(Resource):
    def get(self, login):
        new_user = UserModel('john.snow')
        new_user.save_to_db()
        user = UserModel.query.filter_by(login=login).first()

        if not user:
            return {'message': 'User with this login is not found.'}, 404
        return {'tweets': user.tweets, 'user': user}
