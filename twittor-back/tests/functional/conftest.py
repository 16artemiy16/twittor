import pytest
import os

from application import init_app
from application.models import UserModel


@pytest.fixture()
def test_client():
    """
    Creates the app with Test ENV,
    initializes a testing DB,
    removes the testing DB as teardown.
    """
    app = init_app('test')

    with app.test_client() as testing_client:
        with app.app_context():
            yield testing_client
            os.remove('application/test_data.db')


@pytest.fixture
def user():
    """
    Creates a user in DB and returns him.
    :return: UserModel(login='user1', password='111111', fullname='User One')
    """
    user = UserModel(login='user1', password='111111', fullname='User One')
    user.save_to_db()

    yield user

    user.delete_from_db()
