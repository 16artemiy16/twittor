import click
from flask import Blueprint

from application.models import UserModel
from application.services import jwt

user_cmd_bp = Blueprint('user_cmd', __name__)


@user_cmd_bp.cli.command('create')
@click.argument('login')
@click.argument('password')
def create(login, password):
    if UserModel.find_by_login(login):
        return print('[-] User with this login already exists.')

    user = UserModel(login=login, password=password, fullname='John Smith')
    user.save_to_db()
    print('[+] User crated')


@user_cmd_bp.cli.command('get_token')
@click.argument('login')
@click.argument('password')
def get_token(login, password):
    user = UserModel.find_by_login(login)
    if not user:
        return print(f'[-] User with this login does not exist.')
    if user.is_pass_valid(password):
        token = jwt.generate_token(user)
        return print(f'[+] {token}')
    return print('[-] The password is wrong.')


