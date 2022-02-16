from flask_restful import Resource, reqparse
from flasgger import swag_from

from reqparsers import non_empty_string
from models import UserModel
from entities import bcrypt


class SignUp(Resource):
    def __parse_params_sign_up(self):
        parser = reqparse.RequestParser()
        parser.add_argument('login', type=non_empty_string, help='Login is required', required=True)
        parser.add_argument('password', type=non_empty_string, help='Password is required', required=True)
        parser.add_argument('fullname', type=non_empty_string, help='Full name is required', required=True)

        return parser.parse_args()

    @swag_from('sign_up.yaml')
    def post(self):
        body = self.__parse_params_sign_up()
        login = body['login']
        password = body['password']
        fullname = body['fullname']

        user_with_this_login = UserModel.find_by_login(login)

        if user_with_this_login:
            return {'message': 'User with this login already exists.'}, 400

        user = UserModel(login, fullname)
        user.password = bcrypt.generate_password_hash(password).decode('utf-8')

        try:
            user.save_to_db()
        except:
            return {'message': 'The error occurred when saving to DB.'}, 500

        return {'message': 'The user successfully created.', 'user': user.json()}
