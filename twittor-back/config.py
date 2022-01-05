class DevConfig:
    TESTING = True
    DEBUG = True
    BUNDLE_ERRORS = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'secret'
