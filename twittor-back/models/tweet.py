import time
from entities.db import db


def timestamp_ms():
    return time.time() * 1000


class TweetModel(db.Model):
    __tablename__ = 'tweets'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(300))
    created = db.Column(db.Integer, default=timestamp_ms)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    likes = db.relationship('LikeModel', backref='tweet', lazy='dynamic')

    def __init__(self, body):
        self.body = body

    def json(self):
        return {
            'id': self.id,
            'body': self.body,
            'created': self.created,
            'user': self.user.json(),
        }

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def count_by_user_id(cls, _id):
        return cls.query.filter_by(user_id=_id).count()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
