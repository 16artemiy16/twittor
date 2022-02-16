from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flasgger import Swagger

from config import DevConfig
import resources

app = Flask(__name__, static_folder='filestorage')
app.config.from_object(DevConfig)
CORS(app)

api = Api(app)
jwt = JWTManager(app)
swagger = Swagger(app)

if __name__ == '__main__':
    from entities import db, bcrypt

    @app.before_first_request
    def create_tables():
        db.create_all()

    db.init_app(app)
    bcrypt.init_app(app)
    resources.init_all_routes(api)
    app.run()
