class Config:
    DEBUG = False
    BUNDLE_ERRORS = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SWAGGER = {
        'title': 'Twittor API',
        'uiversion': '3'
    }
    JWT_ACCESS_TOKEN_EXPIRES = 864000  # 10 days
    SQLALCHEMY_DATABASE_URI = None
    JWT_SECRET_KEY = None


class DevConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'
    JWT_SECRET_KEY = 'secret'


class TestingConfig(Config):
    DEBUG = True
    TESTING = True


class ProductionConfig(Config):
    DEBUG = False


config_by_name = dict(
    dev=DevConfig,
    test=TestingConfig,
    prod=ProductionConfig
)
