from db import db


class TweetModel(db.Model):
    __tablename__ = 'tweets'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(300))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def json(self):
        return {'id': self.id, 'body': self.body, 'user_id': self.user_id}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
