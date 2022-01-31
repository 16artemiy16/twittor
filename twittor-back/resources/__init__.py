import resources.auth_resource as auth
import resources.profile_resource as profile
import resources.tweets_resource as tweets


def init_all_routes(api):
    resources = [auth, profile, tweets]

    for res in resources:
        res.init_routes(api)
