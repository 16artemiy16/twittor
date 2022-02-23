from flask_restful import Resource, reqparse

from application.models import UserModel


class SearchUsers(Resource):
    def _parse_get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('query', type=str, required=True)
        parser.add_argument('limit', type=int, default=30)
        return parser.parse_args()

    def get(self):
        args = self._parse_get()

        users = UserModel.query\
            .filter(UserModel.login.op('regexp')(args.get('query')))\
            .limit(args['limit'])

        return {
            'users': [u.json() for u in users],
        }
