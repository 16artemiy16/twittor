from .auth import auth


def init_routes(api):
    api.add_resource(auth.SignUp, '/sign-up')
    api.add_resource(auth.SignIn, '/sign-in')
