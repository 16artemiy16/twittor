from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flasgger import swag_from

from application.models import TweetModel, LikeModel


class TweetLike(Resource):
    @jwt_required()
    @swag_from('like.yaml')
    def post(self, tweet_id):
        tweet = TweetModel.find_by_id(tweet_id)

        if not tweet:
            return {'message': f'Tweet with this id does not exist, id={tweet_id}'}, 404

        like = LikeModel.get(get_jwt_identity(), tweet_id)

        if like:
            like.delete_from_db()
            return {'message': 'Like is reset'}

        like = LikeModel(tweet_id, get_jwt_identity())
        like.save_to_db()
        return {'message': 'Like is set'}
