import click
from flask import Blueprint

from application import bcrypt
from application.models import UserModel
from application.services import jwt

user_cmd_bp = Blueprint('user_cmd', __name__)


@user_cmd_bp.cli.command('create')
@click.argument('login')
@click.argument('password')
def create(login, password):
    if UserModel.find_by_login(login):
        return print('[-] User with this login already exists.')

    user = UserModel(login=login, fullname='John Smith')
    user.password = bcrypt.generate_password_hash(password).decode('utf-8')
    user.save_to_db()
    print('[+] User crated')


@user_cmd_bp.cli.command('get_token')
@click.argument('login')
@click.argument('password')
def get_token(login, password):
    user = UserModel.find_by_login(login)
    if not user:
        return print(f'[-] User with this login does not exist.')
    if bcrypt.check_password_hash(user.password, password):
        token = jwt.generate_token(user)
        return print(f'[+] {token}')
    return print('[-] The password is wrong.')


