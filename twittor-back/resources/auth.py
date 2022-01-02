from flask_restful import Resource, reqparse
from models.user import UserModel
from flask_jwt_extended import create_access_token

from app import bcrypt

class SignUp(Resource):
    def __parse_params_sign_up(self):
        parser = reqparse.RequestParser()
        parser.add_argument('login', type=str, help='Login is required', required=True)
        parser.add_argument('password', type=str, help='Password is required', required=True)

        return parser.parse_args()

    def post(self):
        body = self.__parse_params_sign_up()
        login = body['login']
        password = body['password']

        user_with_this_login = UserModel.find_by_login(login)

        if user_with_this_login:
            return {'message': 'User with this login already exists.'}, 400

        user = UserModel(login)
        user.password = bcrypt.generate_password_hash(password).decode('utf-8')

        try:
            user.save_to_db()
        except:
            return {'message': 'The error occurred when saving to DB.'}, 500

        return {'message': 'The user successfully created.', 'user': user.json()}


class SignIn(Resource):
        def __parse_params_sign_in(self):
            parser = reqparse.RequestParser()
            parser.add_argument('login', type=str, help='Login is required', required=True)
            parser.add_argument('password', type=str, help='Password is required', required=True)

            return parser.parse_args()

        def post(self):
            body = self.__parse_params_sign_in()
            login = body['login']
            password = body['password']

            user = UserModel.find_by_login(login)

            if user and bcrypt.check_password_hash(user.password, password):
                claims = {'id': user.id, 'login': user.login}
                token = create_access_token(user.id, additional_claims=claims)
                return {'token': token}

            return {'message': 'Bad login or password'}, 401


