import pytest
from flask_jwt_extended import decode_token

from application.models import UserModel
from ..utils.requester import AuthRequester


@pytest.fixture
def auth_requester(test_client):
    """ Facade for auth requests, contains sign_in, sign_up requests. """
    return AuthRequester(test_client)


class TestUserSignUp:
    """ Sign Up test cases """
    def test_successful(self, auth_requester):
        """
        GIVEN the sign-up endpoint
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

    def test_error_on_login_occupied(self, auth_requester):
        """
        GIVEN the sign-up endpoint and registered user
        WHEN an attempt to Sign Up picking the already occupied login
        THEN should return the error response
        """

        # Create a user
        user = UserModel(login='user1', password='111111', fullname='User One')
        user.save_to_db()

        res = auth_requester.sign_up(login='user1', password='222222', fullname='Another User')

        # Checking the response correctness
        assert res.status_code == 400
        assert res.json == {'message': 'User with this login already exists.'}

        # Checking the initial user not to be updated
        user_after_req = UserModel.find_by_login('user1')
        assert user.login == user_after_req.login
        assert user.password == user_after_req.password
        assert user.img == user_after_req.img
        assert user.fullname == user_after_req.fullname


class TestUserSignIn:
    """ Sign In test cases """

    def test_error_on_wrong_login_or_password(self, auth_requester):
        """
        GIVEN the sign-in endpoint and a user in DB
        WHEN an attempt to Sign In by wrong login or password
        THEN should return the error response
        """
        user = UserModel(login='user1', password='111111', fullname='User One')
        user.save_to_db()

        res_wrong_pass = auth_requester.sign_in('user1', '222222')
        assert res_wrong_pass.status_code == 401
        assert res_wrong_pass.json['message'] == 'Bad login or password'

        res_wrong_login = auth_requester.sign_in('user44', '111111')
        assert res_wrong_login.status_code == 401
        assert res_wrong_login.json['message'] == 'Bad login or password'

    def test_successful(self, auth_requester):
        """
        GIVEN the sign-in endpoint and a user in DB
        WHEN an attempt to Sign In by correct credentials
        THEN should return the token (id, img, fullname, token)
        """

        user = UserModel(login='user1', password='111111', fullname='User One')
        user.save_to_db()

        res = auth_requester.sign_in('user1', '111111')
        assert res.status_code == 200
        token = res.json['token']
        decoded_token = decode_token(token)

        assert decoded_token['id'] == user.id
        assert decoded_token['img'] == user.img
        assert decoded_token['fullname'] == user.fullname
        assert decoded_token['login'] == user.login
