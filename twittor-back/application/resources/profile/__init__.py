from . import profile, search_users


def init_routes(api):
    api.add_resource(profile.Profile, '/profile/', '/profile/<string:login>')
    api.add_resource(search_users.SearchUsers, '/search-users/')
