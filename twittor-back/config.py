class DevConfig:
    TESTING = True
    DEBUG = True
    BUNDLE_ERRORS = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'secret'
    JWT_ACCESS_TOKEN_EXPIRES = 864000  # 10 days
    SWAGGER = {
        'title': 'Twittor API',
        'uiversion': '3'
    }
