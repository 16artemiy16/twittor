from application import db, bcrypt


class UserModel(db.Model):
    __tablename__ = 'users'

    def __init__(self, login, password, fullname):
        self.login = login
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
        self.fullname = fullname

    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    img = db.Column(db.String(255))
    fullname = db.Column(db.String(100), nullable=False)

    tweets = db.relationship('TweetModel', backref='user', lazy='dynamic')
    likes = db.relationship('LikeModel', backref='user', lazy='dynamic')

    @property
    def img_path(self):
        # TODO: a piece of img path is hardcoded, works only with localhost
        return f'http://localhost:5000/filestorage/profile/{self.img}' if self.img else None

    def is_pass_valid(self, explicit_pass):
        return bcrypt.check_password_hash(self.password, explicit_pass)

    def json(self):
        return {
            'id': self.id,
            'login': self.login,
            'img': self.img_path,
            'fullname': self.fullname
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_login(cls, login):
        return cls.query.filter_by(login=login).first()
