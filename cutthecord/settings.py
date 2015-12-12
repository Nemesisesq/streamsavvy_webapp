"""
Django settings for cutthecord project.

Generated by 'django-admin startproject' using Django 1.8.2.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
from urllib.parse import urlparse

from server.shortcuts import SettingsVars, DBurl

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '(%iglg64ui6_)1-wpfk#z05bsh**k%c##@l)12u@30)c-oy9l4'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    # 'haystack',
    'server',
    'rest_framework',
    'markdown',
    'django_filters',
    'social.apps.django_app.default',
    'django_rq',

)

MIDDLEWARE_CLASSES = (
    'django.middleware.cache.UpdateCacheMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'server.middleware.access_management.BlockLiveSiteFromNonAdminUsers',
    'server.middleware.anon_user_middleware.ProcessAnonUser',
    # 'django.middleware.cache.FetchFromCacheMiddleware',
)

ROOT_URLCONF = 'cutthecord.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cutthecord.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

# DATABASES = {
# 'default': {
# 'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }
#
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'ctcdb',
#         'USER': 'ctc_user',
#         'PASSWORD': 'test',
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
# }


# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = 'staticfiles'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, 'static/dist'),
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # 'compressor.finders.CompressorFinders'
)

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'templates'),
)

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
        # 'rest_framework.permissions.IsAdminUser'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication'

    ),
    'PAGE_SIZE': 10
}

TEST_RUNNER = 'django_behave.runner.DjangoBehaveTestSuiteRunner'


# Parse database configuration from $DATABASE_URL
DATABASES = {}

import dj_database_url

if os.environ.get('HEROKU', None):
    pass
else:
    DATABASE_URL = DBurl(BASE_DIR).url

DATABASES['default'] = dj_database_url.config(default=DATABASE_URL)

#############################
#  CACHES                   #
#############################
x = urlparse(os.environ.get('REDISCLOUD_URL'))
y = x.path
z = x.netloc
redis_url = urlparse(os.environ.get('REDISCLOUD_URL'))

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
# STATICFILES_DIRS = (
# os.path.join(BASE_DIR, 'static'),
# )
STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

AUTHENTICATION_BACKENDS = (
    'social.backends.facebook.FacebookOAuth2',
    'social.backends.instagram.InstagramOAuth2',
    'social.backends.twitter.TwitterOAuth',
    'django.contrib.auth.backends.ModelBackend',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'social.apps.django_app.context_processors.backends',
    'social.apps.django_app.context_processors.login_redirect',
)

credentials = SettingsVars(BASE_DIR)

# TODO set up environment variables for the purposes of testing
#############################
#  FACEBOOK                 #
#############################
SOCIAL_AUTH_FACEBOOK_KEY = credentials.facebook['app_id']
SOCIAL_AUTH_FACEBOOK_SECRET = credentials.facebook['secret']

SOCIAL_AUTH_FACEBOOK_SCOPE = ['email']

#############################
#  INSTAGRAM                #
#############################
SOCIAL_AUTH_INSTAGRAM_KEY = 'f0ac789e2ee5470aa5183e34e6ab614c'
SOCIAL_AUTH_INSTAGRAM_SECRET = '9fc740b480d842d791f5ac1e46dcaa9f'

SOCIAL_AUTH_INSTAGRAM_AUTH_EXTRA_ARGUMENTS = {}

#############################
#  TWITTER                  #
#############################
SOCIAL_AUTH_TWITTER_KEY = 'cLVR8wg1x7lEcKUyrCzq9sSyb'
SOCIAL_AUTH_TWITTER_SECRET = 'iBBWHGbMcSty45cK9RQwEXNhdmgzbTonQkZ8cBqKJmYlhPUyFI'


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
        'URL': os.getenv('REDISCLOUD_URL', 'redis://localhost:6379'),
        'DB': 0,
        'DEFAULT_TIMEOUT': 360,
    },
    'high': {
        'URL': os.getenv('REDISCLOUD_URL', 'redis://localhost:6379'),  # If you're on Heroku
        'DB': 0,
        'DEFAULT_TIMEOUT': 500,
    },
    'low': {
        'URL': os.getenv('REDISCLOUD_URL', 'redis://localhost:6379'),
        'DB': 0,
    }
}
