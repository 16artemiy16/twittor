from db import db


class UserModel(db.Model):
    __tablename__ = 'users'

    def __init__(self, login, fullname):
        self.login = login
        self.fullname = fullname

    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    img = db.Column(db.String(255))
    fullname = db.Column(db.String(100), nullable=False)

    tweets = db.relationship('TweetModel', backref='user', lazy='dynamic')
    likes = db.relationship('LikeModel', backref='user', lazy='dynamic')

    def json(self):
        return {'id': self.id, 'login': self.login, 'img': self.img, 'fullname': self.fullname}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_login(cls, login):
        return cls.query.filter_by(login=login).first()
