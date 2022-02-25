import pytest
import os

from application import init_app


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
