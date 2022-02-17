from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flasgger import Swagger
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

cors = CORS()
jwt = JWTManager()
swagger = Swagger()
db = SQLAlchemy()
bcrypt = Bcrypt()


def init_app():
    app = Flask(__name__, instance_relative_config=False, static_folder='filestorage')
    app.config.from_object('config.DevConfig')

    cors.init_app(app)
    jwt.init_app(app)
    swagger.init_app(app)
    db.init_app(app)
    bcrypt.init_app(app)

    from application import resources
    resources.api.init_app(app)

    return app



