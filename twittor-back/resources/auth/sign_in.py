from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token

from app import bcrypt
from reqparsers.types import non_empty_string
from models.user import UserModel


class SignIn(Resource):
    def __parse_params_sign_in(self):
        parser = reqparse.RequestParser()
        parser.add_argument('login', type=non_empty_string, help='Login is required', required=True)
        parser.add_argument('password', type=non_empty_string, help='Password is required', required=True)

        return parser.parse_args()

    def post(self):
        body = self.__parse_params_sign_in()
        login = body['login']
        password = body['password']

        user = UserModel.find_by_login(login)

        if user and bcrypt.check_password_hash(user.password, password):
            claims = {'id': user.id, 'login': user.login, 'fullname': user.fullname}
            token = create_access_token(user.id, additional_claims=claims)
            return {'token': token}

        return {'message': 'Bad login or password'}, 401
