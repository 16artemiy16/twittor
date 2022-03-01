import pytest

from ..utils.requester import ProfileRequester
from application.models import UserModel


@pytest.fixture
def profile_requester(test_client):
    """ Facade for Profile requests. """
    return ProfileRequester(test_client)


class TestProfileGet:
    """ Getting profile information tests  """
    def test_unauthorized_error(self, profile_requester):
        """
        GIVEN a user, to auth token provided
        WHEN an attempt to get the user's profile info
        THEN should return 401 unauthorized response
        """
        # Create a user
        user = UserModel(login='user1', password='111111', fullname='User One')
        user.save_to_db()

        res = profile_requester.get_profile(user.login)
        assert res.status_code == 401
        assert res.json == {'msg': 'Missing Authorization Header'}

