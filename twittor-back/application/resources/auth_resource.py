from .auth import sign_up, sign_in


def init_routes(api):
    api.add_resource(sign_up.SignUp, '/sign-up')
    api.add_resource(sign_in.SignIn, '/sign-in')
