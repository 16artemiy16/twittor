import unittest
from application.models import UserModel


class TestUserModel(unittest.TestCase):
    def test_create(self):
        """
        GIVEN a User model
        WHEN a new user is created
        THEN check the login, fullname, password (must be hashed) and password comparison
        """
        user = UserModel(login='user1', password='111111', fullname='First User')

        self.assertEqual(user.login, 'user1')
        self.assertEqual(user.fullname, 'First User')
        self.assertNotEqual(user.password, '111111')

        self.assertTrue(user.is_pass_valid('111111'))
        self.assertFalse(user.is_pass_valid('123456'))


if __name__ == '__main__':
    unittest.main()
