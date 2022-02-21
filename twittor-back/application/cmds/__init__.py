from flask import Blueprint

from .user import user_cmd_bp

cmd_bp = Blueprint('cmd', __name__)

cmd_bp.register_blueprint(user_cmd_bp, cli_group='user')
