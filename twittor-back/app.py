from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

from config import DevConfig

app = Flask(__name__)
app.config.from_object(DevConfig)

api = Api(app)
db = SQLAlchemy(app)

if __name__ == '__main__':
    from resources.tweet import TweetListByUser

    @app.before_first_request
    def create_tables():
        db.create_all()

    api.add_resource(TweetListByUser, '/tweets-by-user/<string:login>')
    app.run()
