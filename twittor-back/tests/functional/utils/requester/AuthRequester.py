from . import Requester


class AuthRequester(Requester):
    def sign_up(self, login, password, fullname):
        return self.client.post(
            '/sign-up',
            content_type='application/json',
            json={'login': login, 'password': password, 'fullname': fullname}
        )

    def sign_in(self, login, password):
        return self.client.post(
            '/sign-in',
            content_type='application/json',
            json={'login': login, 'password': password}
        )
