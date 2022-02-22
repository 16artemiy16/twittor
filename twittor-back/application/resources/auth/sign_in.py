from flask_restful import Resource, reqparse
from flasgger import swag_from

from application.reqparsers import non_empty_string
from application.models import UserModel
from application.services.jwt import generate_token


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

        if user and user.is_pass_valid(password):
            token = generate_token(user)
            return {'token': token}

        return {'message': 'Bad login or password'}, 401
