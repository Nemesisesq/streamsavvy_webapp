"""
Django settings for streamsavvy_webapp project.

Generated by 'django-admin startproject' using Django 1.9.2.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""
import datetime

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
from urllib.parse import urlparse

from server.shortcuts import SettingsVars, DBurl

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def get_env_variable(var_name, default=False):
    """
    Get the environment variable or return exception
    :param var_name: Environment Variable to lookup
    """

    try:
        return os.environ[var_name]
    except KeyError:
        import io
        import configparser
        env_file = os.environ.get('PROJECT_ENV_FILE', os.path.join(BASE_DIR, ".env"))
        try:
            config = io.StringIO()
            config.write("[DATA]\n")
            config.write(open(env_file).read())
            config.seek(0, os.SEEK_SET)
            cp = configparser.ConfigParser()
            cp.readfp(config)
            value = dict(cp.items('DATA'))[var_name.lower()]
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1]
            os.environ.setdefault(var_name, value)
            return value
        except (KeyError, IOError):
            if default is not False:
                return default
            from django.core.exceptions import ImproperlyConfigured
            error_msg = "Either set the env variable '{var}' or place it in your " \
                        "{env_file} file as '{var} = VALUE'"
            raise ImproperlyConfigured(error_msg.format(var=var_name, env_file=env_file))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'u9kg9y#t5a=uc86bsob9#o5n6*d=k^f--1t_l(-sh@7mrs#y*a'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False if get_env_variable('ENVIRONMENT') == 'PRODUCTION' else True

ALLOWED_HOSTS = ['.streamsavvy.tv', '.herokuapp.com'] if get_env_variable("ENVIRONMENT") == "PRODUCTION" else ['*']
# Application definition


# User = get_user_model()
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_behave',
    'django_extensions',
    'server',
    'guide',
    'rest_framework',
    'markdown',
    'django_filters',
    'social.apps.django_app.default',
    'django_rq',
    'corsheaders',
    'oauth2_provider',
    # 'django_seo_js',
    # 'haystack',
    # 'debug_toolbar',
    # 'rest_framework_jwt',
    # 'rest_framework.authtoken',
]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'server.middleware.access_management.DisableCSRF',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'server.middleware.anon_user_middleware.ProcessAnonUser',
    'server.middleware.social.SaveInitialPackage',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'server.middleware.access_management.LogUserIfExistsForSignUp',
    # 'server.middleware.duplicate_email.DuplicateEmail',
    # 'server.middleware.device_id.DeviceIDMiddleWare',
    # 'django_seo_js.middleware.EscapedFragmentMiddleware',  # If you're using #!
    # 'django_seo_js.middleware.UserAgentMiddleware',
]

SEO_JS_PRERENDER_TOKEN = 'X3aA9tuDrermHDqxnY5P'

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = False

ROOT_URLCONF = 'streamsavvy_webapp.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social.apps.django_app.context_processors.backends',
                'social.apps.django_app.context_processors.login_redirect',
            ],
        },
    },
]

CSRF_COOKIE_SECURE = True

WSGI_APPLICATION = 'streamsavvy_webapp.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # 'compressor.finders.CompressorFinders'
)

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.IsAuthenticatedOrReadOnly',
        # 'rest_framework.permissions.IsAdminUser'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'server.auth.JWTAuthentication',

    ),
    'PAGE_SIZE': 30
}

TEST_RUNNER = 'django_behave.runner.DjangoBehaveTestSuiteRunner'

import dj_database_url

DATABASES = {}

DATABASES['default'] = dj_database_url.config(default='postgres://postgres:streamsavvy@localhost:5432/streamsavvy3')
# DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql_psycopg2'

#############################
#  CACHES                   #
#############################

redis_url = urlparse(os.environ.get('REDIS_URL'))

CACHES = {
    'default': {
        'BACKEND': 'redis_cache.RedisCache',
        'LOCATION': [
            '{0}:{1}'.format(redis_url.hostname, redis_url.port)
        ],
        'OPTIONS': {
            'PASSWORD': redis_url.password,
            'DB': 0,
        }
    }
}

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# # Allow all host headers
# ALLOWED_HOSTS = ['*']
#
# # Static asset configuration
# import os
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# STATIC_ROOT = 'staticfiles'
# STATIC_URL = '/static/'
#
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

AUTHENTICATION_BACKENDS = (
    # 'oauth2_provider.backends.OAuth2Backend',
    'social.backends.facebook.FacebookOAuth2',
    'social.backends.instagram.InstagramOAuth2',
    'social.backends.username.UsernameAuth',
    'server.backends.EmailOrUsernameModelBackend',
    'django.contrib.auth.backends.ModelBackend',
    # 'social.backends.twitter.TwitterOAuth',
)

SESSION_ENGINE = "django.contrib.sessions.backends.signed_cookies"

# SOCIAL_AUTH_TWITTER_KEY = get_env_variable('TWITTER_KEY')
# SOCIAL_AUTH_TWITTER_SECRET = get_env_variable('TWITTER_SECRET')

SOCIAL_AUTH_FACEBOOK_KEY = get_env_variable('FACEBOOK_KEY')
SOCIAL_AUTH_FACEBOOK_SECRET = get_env_variable('FACEBOOK_SECRET')
SOCIAL_AUTH_FACEBOOK_SCOPE = ['email', 'public_profile', 'user_friends']

SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {
    'locale': 'en_US',
    'fields': 'id, name, email, age_range'
}

SOCIAL_AUTH_LOGIN_REDIRECT_URL = get_env_variable('SOCIAL_REDIRECT')
# SOCIAL_AUTH_USER_MODEL = 'django.contrib.auth.User'

SOCIAL_AUTH_ADMIN_USER_SEARCH_FIELDS = ['username', 'first_name', 'email']

SOCIAL_AUTH_PIPELINE = (
    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'social.pipeline.user.get_username',
    'social.pipeline.social_auth.associate_by_email',  # <--- enable this one
    'social.pipeline.user.create_user',
    'social.pipeline.social_auth.associate_user',
    'server.pipelines.save_additional_info.save_additional_info',
    'social.pipeline.social_auth.load_extra_data',
    'social.pipeline.user.user_details',
)

# TEMPLATE_CONTEXT_PROCESSORS = (
#     'social.apps.django_app.context_processors.backends',
#     'social.apps.django_app.context_processors.login_redirect',
# )


# TODO set up environment variables for the purposes of testing
#############################
#  FACEBOOK                 #
#############################

#############################
#  LOGGING                  #
#############################

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt': "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'mysite.log',
            'formatter': 'verbose'
        },
        'dbfile': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'dbtransaction.log',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['dbfile'],
            'propagate': True,
            'level': 'DEBUG',
        },
        'cutthecord': {
            'handlers': ['file'],
            'level': 'DEBUG',
        },
    }
}

RQ_QUEUES = {
    'default': {
        'URL': os.getenv('REDIS_URL', 'redis://localhost:6379'),
        'DB': 0,
        'DEFAULT_TIMEOUT': 360,
    },
    'high': {
        'URL': os.getenv('REDIS_URL', 'redis://localhost:6379'),  # If you're on Heroku
        'DB': 0,
        'DEFAULT_TIMEOUT': 500,
    },
    'low': {
        'URL': os.getenv('REDIS_URL', 'redis://localhost:6379'),
        'DB': 0,
    }
}

# JWT_ALLOW_REFRESH = True
#
# JWT_VERIFY_EXPIRATION = False

# JWT_AUTH = {
#     'JWT_ENCODE_HANDLER':
#         'rest_framework_jwt.utils.jwt_encode_handler',
#
#     'JWT_DECODE_HANDLER':
#         'rest_framework_jwt.utils.jwt_decode_handler',
#
#     'JWT_PAYLOAD_HANDLER':
#         'rest_framework_jwt.utils.jwt_payload_handler',
#
#     'JWT_PAYLOAD_GET_USER_ID_HANDLER':
#         'rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler',
#
#     'JWT_RESPONSE_PAYLOAD_HANDLER':
#         'rest_framework_jwt.utils.jwt_response_payload_handler',
#
#     'JWT_SECRET_KEY': SECRET_KEY,
#     'JWT_ALGORITHM': 'HS256',
#     'JWT_VERIFY': True,
#     'JWT_VERIFY_EXPIRATION': True,
#     'JWT_LEEWAY': 0,
#     'JWT_EXPIRATION_DELTA': datetime.timedelta(hours=12),
#     'JWT_AUDIENCE': None,
#     'JWT_ISSUER': None,
#
#     'JWT_ALLOW_REFRESH': False,
#     'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=30),
#
#     'JWT_AUTH_HEADER_PREFIX': 'JWT',
# }
