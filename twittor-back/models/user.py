from app import db


class UserModel(db.Model):
    __tablename__ = 'users'

    def __init__(self, login):
        self.login = login

    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(40), unique=True, nullable=False)
    img = db.Column(db.String(255))

    tweets = db.relationship('TweetModel', backref='user', lazy=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
