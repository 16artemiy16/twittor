from flask_jwt_extended import create_access_token


def generate_token(user):
    claims = {'id': user.id, 'login': user.login, 'fullname': user.fullname, 'img': user.img_path}
    return create_access_token(user.id, additional_claims=claims)
