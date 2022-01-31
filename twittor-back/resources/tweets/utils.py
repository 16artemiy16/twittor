from models.like import LikeModel


def add_likes_details(data, user_id):
    data['likes'] = {
        'total': LikeModel.get_count_in_tweet(data['id']),
        'isLikedByMe': LikeModel.is_tweet_liked_by_user(data['id'], user_id)
    }
    return data
