import json
import os
from urllib.parse import urlparse

from django.http import HttpResponseNotAllowed
import yaml
import psycopg2


__author__ = 'Nem'


def api_json_post(view_func):
    """
    View decorator, which wraps the request and expects posted Json
    :param view_func:
    :return:
    """

    def wrapped(request, *args, **kwargs):
        if request.method != 'POST':
            return HttpResponseNotAllowed(['POST'])

        the_json = json.loads(str(request.body, encoding='utf-8'))

        return view_func(request, the_json, *args, **kwargs)

    return wrapped


class SettingsVars(object):
    facebook = {}

    def __init__(self, BASE_DIR):
        self.get_facebook(BASE_DIR)

    def get_facebook(self, BASEDIR):
        with open(os.path.join(BASEDIR, 'settings_vars.yaml')) as file_descriptor:
            data = yaml.load(file_descriptor)
            self.facebook = data['facebook']
        return data


class DBurl(object):
    url = ''

    def __init__(self, BASE_DIR):
        self.get_db_url(BASE_DIR)

    def get_db_url(self, BASE_DIR):
        try:

            with open(os.path.join(BASE_DIR, 'db.yaml')) as file:
                self.url = yaml.load(file)

            result = urlparse(self.url['postgres_url'])
            u = result.username
            p = result.password
            d = result.path[1:]
            h = result.hostname
            connection = psycopg2.connect(
                database=d,
                user=u,
                password=p,
                host=h
            )

            return self.url
        except:
            return 'sqlite:///db.sqlite3'