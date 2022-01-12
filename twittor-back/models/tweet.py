from db import db


class TweetModel(db.Model):
    __tablename__ = 'tweets'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(300))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    likes = db.relationship('LikeModel', backref='tweet', lazy='dynamic')

    def __init__(self, body):
        self.body = body

    def json(self):
        return {
            'id': self.id,
            'body': self.body,
            'user': self.user.json()
        }

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
