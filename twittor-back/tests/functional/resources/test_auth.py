import pytest

from application.models import UserModel
from ..utils.requester import AuthRequester


@pytest.fixture
def auth_requester(test_client):
    return AuthRequester(test_client)


class TestUserSignUp:
    def test_successful(self, auth_requester):
        """
        GIVEN the sign-in endpoint
        WHEN an attempt to Sign Up with valid data
        THEN a user should be created with this data,
             created user img field should be None,
             should be returned the created user main data
        """

        res = auth_requester.sign_up(login='user1', password='111111', fullname='User One')

        # Checking the response for correctness
        assert res.status_code == 200
        assert res.json['message'] == 'The user successfully created.'
        assert res.json['user'] == {'id': 1, 'login': 'user1', 'img': None, 'fullname': 'User One'}

        # Checking the created user in the DB
        user = UserModel.find_by_login('user1')
        assert user.login == 'user1'
        assert user.fullname == 'User One'
        assert user.img is None
