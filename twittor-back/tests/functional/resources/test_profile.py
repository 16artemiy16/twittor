import pytest

from application.models import UserModel
from ..utils.requester import ProfileRequester


@pytest.fixture
def profile_requester(test_client):
    """ Facade for Profile requests. """
    return ProfileRequester(test_client)


@pytest.fixture
def auth(profile_requester):
    """
    Creates a user in DB, set his auth token in requests and returns him.
    :return UserModel(login='authed', password='111111', fullname='Authed User')
    """
    user = UserModel(login='authed', password='111111', fullname='Authed User')
    user.save_to_db()

    profile_requester.use_auth(user)
    yield user
    profile_requester.wipe_auth()
    user.delete_from_db()


class TestProfileGet:
    """ Getting profile information tests  """
    def test_unauthorized_error(self, profile_requester, user):
        """
        GIVEN a user, no auth token provided
        WHEN an attempt to get the user's profile info
        THEN should return 401 unauthorized response
        """
        res = profile_requester.get_profile(user.login)
        assert res.status_code == 401
        assert res.json == {'msg': 'Missing Authorization Header'}

    def test_get_self(self, profile_requester, auth):
        """
        GIVEN: an authed user
        WHEN an attempt to get profile info without providing the login param
        THEN should return the current user info
        """
        res = profile_requester.get_profile()
        assert res.status_code == 200
        assert res.json == {
            'profile': {
                'id': auth.id, 'login': auth.login, 'img': auth.img, 'fullname': auth.fullname,
                'stats': {'tweets': 0}
            }
        }

    @pytest.mark.usefixtures('auth')
    def test_get_another_user(self, profile_requester, user):
        """
        GIVEN: an authed user
        WHEN an attempt to get profile info providing the correct login param
        THEN should return the login owner's info
        """
        res = profile_requester.get_profile(user.login)
        assert res.status_code == 200
        assert res.json == {
            'profile': {
                'id': user.id, 'login': user.login, 'img': user.img, 'fullname': user.fullname,
                'stats': {'tweets': 0}
            }
        }


class TestSearchUsers:
    def test_search_users(self, profile_requester):
        users = [UserModel(login, '111111', 'Test User') for login in ['user1', 'user2', 'user3']]
        for user in users:
            user.save_to_db()

        res = profile_requester.search_users('user')

        assert res.status_code == 200
        assert res.json.get('users') == [u.json() for u in users]
