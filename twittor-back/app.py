from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flasgger import Swagger

from config import DevConfig
import resources

app = Flask(__name__, static_folder='filestorage')
app.config.from_object(DevConfig)
CORS(app)

api = Api(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
swagger = Swagger(app)

if __name__ == '__main__':
    from db import db

    @app.before_first_request
    def create_tables():
        db.create_all()

    db.init_app(app)
    resources.init_all_routes(api)
    app.run()
