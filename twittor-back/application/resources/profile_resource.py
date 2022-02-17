from .profile import profile


def init_routes(api):
    api.add_resource(profile.Profile, '/profile/', '/profile/<string:login>')
