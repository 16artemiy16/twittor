from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flasgger import Swagger
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

from .config import config_by_name

cors = CORS()
jwt = JWTManager()
swagger = Swagger()
db = SQLAlchemy()
bcrypt = Bcrypt()


def init_app(config_name):
    app = Flask(__name__, instance_relative_config=False, static_folder='filestorage')
    app.config.from_object(
        config_by_name[config_name]
    )

    cors.init_app(app)
    jwt.init_app(app)
    swagger.init_app(app)
    db.init_app(app)
    bcrypt.init_app(app)

    with app.app_context():
        from application.cmds import cmd_bp
        from application import resources
        resources.api.init_app(app)
        app.register_blueprint(cmd_bp)

        db.create_all()

    return app



