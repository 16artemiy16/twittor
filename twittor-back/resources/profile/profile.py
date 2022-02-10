from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from flasgger import swag_from

from models.user import UserModel
from models.tweet import TweetModel
from services.filesaver import FileSaver, WrongExtError, IMG_ALLOWED_EXTS
from services.jwt import generate_token

def _res_error_img_extension(field):
    return {
        'success': False,
        'field': field,
        'msg': f'The file extension is not allowed. Available only: {IMG_ALLOWED_EXTS}',
    }


class Profile(Resource):
    def _parse_put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('fullname', required=False)
        parser.add_argument('profileImg', required=False, location='files')

        args = parser.parse_args()

        # RequestParser is  not used for 'profileImg' because the file it receives has no save() method,
        # therefore I don't know how to save it
        if args.get('profileImg'):
            args['profileImg'] = request.files['profileImg']

        return args

    @jwt_required()
    @swag_from('profile_get.yaml')
    def get(self, login=None):
        user = UserModel.find_by_login(login) if login else UserModel.find_by_id(get_jwt_identity())

        if not user:
            return {'message': 'User with this login does not exist'}, 404

        profile = user.json()
        profile['stats'] = {
            'tweets': TweetModel.count_by_user_id(user.id)
        }

        return {'profile': profile}

    @jwt_required()
    def put(self):
        user = UserModel.find_by_id(get_jwt_identity())
        args = self._parse_put()
        updated_fields = []

        fullname = args.get('fullname')
        if fullname:
            user.fullname = fullname
            updated_fields.append('fullname')

        profile_img = args.get('profileImg')
        if profile_img:
            try:
                filename = FileSaver.save_profile_img(profile_img)
                user.img = filename
                updated_fields.append('profileImg')
            except WrongExtError:
                return _res_error_img_extension('profileImg')

        try:
            user.save_to_db()
            new_token = generate_token(user)
            return {'success': True, 'updated': updated_fields, 'token': new_token}
        except:
            FileSaver.remove_profile_img(user.img)
            return {'success': False, 'msg': 'Something went wrong when saving to DB.'}
