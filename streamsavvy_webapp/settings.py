"""
Django settings for streamsavvy_webapp project.

Generated by 'django-admin startproject' using Django 1.9.2.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
from urllib.parse import urlparse

from server.shortcuts import SettingsVars, DBurl

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'u9kg9y#t5a=uc86bsob9#o5n6*d=k^f--1t_l(-sh@7mrs#y*a'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_behave',
    'django_extensions',
    # 'haystack',
    'server',
    'guide',
    'rest_framework',
    'markdown',
    'django_filters',
    'social.apps.django_app.default',
    'django_rq',
    'debug_toolbar',
    'corsheaders',
    'oauth2_provider',
    'whoosh',
    'haystack'
]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'oauth2_provider.middleware.OAuth2TokenMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'server.middleware.anon_user_middleware.ProcessAnonUser',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

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
STATIC_ROOT = os.path.join(BASE_DIR,'staticfiles')

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # 'compressor.finders.CompressorFinders'
)

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
        # 'rest_framework.permissions.IsAdminUser'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.BasicAuthentication',
        'oauth2_provider.ext.rest_framework.OAuth2Authentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication'

    ),
    'PAGE_SIZE': 20
}

TEST_RUNNER = 'django_behave.runner.DjangoBehaveTestSuiteRunner'

import dj_database_url

DATABASES = {}

if os.environ.get('HEROKU', None):
    pass
else:
    DATABASE_URL = DBurl(BASE_DIR).url

DATABASES['default'] = dj_database_url.config(default=DATABASE_URL)
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
    'oauth2_provider.backends.OAuth2Backend',
    'social.backends.facebook.FacebookOAuth2',
    'social.backends.instagram.InstagramOAuth2',
    'social.backends.twitter.TwitterOAuth',
    'social.backends.username.UsernameAuth',
    'django.contrib.auth.backends.ModelBackend',
)

# TEMPLATE_CONTEXT_PROCESSORS = (
#     'social.apps.django_app.context_processors.backends',
#     'social.apps.django_app.context_processors.login_redirect',
# )

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
WHOOSH_INDEX = os.path.join(BASE_DIR, 'whoosh')

HAYSTACK_CONNECTIONS = {
    'default' : {
        'ENGINE': 'haystack.backends.whoosh_backend.WhooshEngine',
        'PATH' : WHOOSH_INDEX
    }
}
