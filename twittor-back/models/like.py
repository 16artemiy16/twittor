from db import db


class LikeModel(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id'), nullable=False)

    def __init__(self, tweet_id, user_id):
        self.tweet_id = tweet_id
        self.user_id = user_id

    def json(self):
        return {'id': self.id, 'user_id': self.user_id, 'tweet_id': self.tweet_id}

    @classmethod
    def get(cls, user_id, tweet_id):
        return cls.query.filter_by(user_id=user_id, tweet_id=tweet_id).first()

    @classmethod
    def get_count_in_tweet(cls, tweet_id):
        return cls.query.filter_by(tweet_id=tweet_id).count()

    @classmethod
    def is_tweet_liked_by_user(cls, tweet_id, user_id):
        return cls.query.filter_by(tweet_id=tweet_id, user_id=user_id).first() is not None

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

