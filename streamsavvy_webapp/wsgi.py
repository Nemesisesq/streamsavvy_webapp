"""
WSGI config for streamsavvy_webapp project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os

from dj_static import Cling
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "streamsavvy_webapp.settings")

from whitenoise.django import DjangoWhiteNoise


application = Cling(get_wsgi_application())
application = DjangoWhiteNoise(application)