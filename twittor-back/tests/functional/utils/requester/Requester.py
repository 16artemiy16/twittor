from application.services.jwt import generate_token


class Requester:
    """
    Each specific requester should inherit this superclass.
    """
    def __init__(self, client):
        self.client = client
        self.token = None
        self.user = None

    def use_auth(self, user):
        """ Set user to pass JWT authentication """
        self.token = generate_token(user)
        self.user = user
        return self

    def wipe_auth(self):
        """ Reset jwt token used for auth """
        self.token = None
        self.user = None
        return self
