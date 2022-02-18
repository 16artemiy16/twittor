from flask_restful import Api

from . import auth, profile, tweets


def _init_all_routes(api):
    resources = [auth, profile, tweets]

    for res in resources:
        res.init_routes(api)


api = Api()
_init_all_routes(api)
