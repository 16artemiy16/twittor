from flask import Flask
from flask_restful import Api

from config import DevConfig

app = Flask(__name__)
app.config.from_object(DevConfig)

api = Api(app)

if __name__ == '__main__':
    from db import db

    from resources.tweet import TweetListByUser
    from models.tweet import TweetModel
    from models.user import UserModel

    @app.before_first_request
    def create_tables():
        db.create_all()

    db.init_app(app)
    api.add_resource(TweetListByUser, '/tweets-by-user/<string:login>')
    app.run()
