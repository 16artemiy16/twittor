from flask_restful import Api

import application.resources.profile_resource as profile
import application.resources.auth_resource as auth
import application.resources.tweets_resource as tweets


def _init_all_routes(api):
    resources = [auth, profile, tweets]

    for res in resources:
        res.init_routes(api)


api = Api()
_init_all_routes(api)
