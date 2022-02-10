from flask_restful import Resource, reqparse
from flasgger import swag_from

from app import bcrypt
from reqparsers.types import non_empty_string
from models.user import UserModel
from services.jwt import generate_token


class SignIn(Resource):
    def __parse_params_sign_in(self):
        parser = reqparse.RequestParser()
        parser.add_argument('login', type=non_empty_string, help='Login is required', required=True)
        parser.add_argument('password', type=non_empty_string, help='Password is required', required=True)

        return parser.parse_args()

    @swag_from('sign_in.yaml')
    def post(self):
        body = self.__parse_params_sign_in()
        login = body['login']
        password = body['password']

        user = UserModel.find_by_login(login)

        if user and bcrypt.check_password_hash(user.password, password):
            token = generate_token(user)
            return {'token': token}

        return {'message': 'Bad login or password'}, 401
