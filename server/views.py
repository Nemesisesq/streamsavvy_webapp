import json
import logging
import urllib
import urllib.request
import urllib.parse

from django.views.decorators.csrf import csrf_exempt
from social.actions import do_complete
from social.apps.django_app.utils import strategy
from social.apps.django_app.views import _do_login

from server.shortcuts import api_json_post, try_catch
from streamsavvy_webapp.settings import get_env_variable
import requests

import re
import time

from django.core.cache import cache
from django.db.models import Q
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets
from django.views.generic import View
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from django.contrib.auth.models import Group

from server.apis.guidebox import GuideBox
from server.apis.netflixable import Netflixable
from server.models import *
from server.permissions import IsAdminOrReadOnly, SaveFirstShowThenRequireAuthentication
from server.serializers import UserSerializer, GroupSerializer, HardwareSerializer, ChannelSerializer, \
    ContentSerializer, PackagesSerializer, PackageDetailSerializer, ChannelImagesSerializer

from social.actions import do_complete
from social.apps.django_app.utils import strategy
from social.apps.django_app.views import _do_login


def flatten(l):
    out = []
    for item in l:
        if isinstance(item, (list, tuple)):
            out.extend(flatten(item))
        else:
            out.append(item)
    return out


def get_user(self):
    if self.request.user.is_anonymous():
        if not self.request.session.get('has_session'):
            self.request.session['has_session'] = True
            self.request.session.save()
        try:
            user = AnonymousUser.objects.get(session=self.request.session.session_key)
        except:
            user = AnonymousUser(session=self.request.session.session_key)
            user.username = time.time()

        user.save()


    else:
        user = self.request.user

    return user


def get_packages(user):
    package = Package.objects.filter(owner=user)

    if not package:
        Package(owner=user).save()
        package = Package.objects.filter(owner=user)

    return package


class AdminPermMixin(object):
    permission_classes = (IsAdminOrReadOnly,)


class HardwareViewSet(viewsets.ModelViewSet):
    queryset = Hardware.objects.all()
    serializer_class = HardwareSerializer


class ChannelViewSet(viewsets.ModelViewSet):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    http_method_names = ['get']


class ContentViewSet(viewsets.ModelViewSet):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    http_method_names = ['get']

    def get_object(self):
        obj = super(ContentViewSet, self).get_object()
        g = GuideBox()

        if 'detail' in obj.guidebox_data:
            obj = g.process_content_for_sling_ota_banned_channels(obj, True)
            obj.save()
            return obj

        else:
            detail = g.get_content_detail(obj.guidebox_data['id'])
            detail = json.loads(detail)

            obj.guidebox_data['detail'] = detail

            obj = g.process_content_for_sling_ota_banned_channels(obj, True)

            obj.save()
            return obj


class PopularShowsViewSet(viewsets.ModelViewSet):
    # queryset = get_popular_shows()
    serializer_class = ContentSerializer
    http_method_names = ['get']

    def get_popular_shows(self):
        shows = ["Community",
                 "Comedians in Cars Getting Coffee",
                 "Transparent", "Happy Valley",
                 "House of Cards",
                 "Deadbeat",
                 "Bosch",
                 "The Mindy Project",
                 "Orange is the New Black"]
        q = None

        for show in shows:

            query = Q(title__iexact=show)

            if q is None:
                q = query

            else:
                q = q | query

        return q

    def get_queryset(self):
        return Content.objects.filter(self.get_popular_shows())


class PackagesViewSet(viewsets.ModelViewSet):
    serializer_class = PackagesSerializer
    http_method_names = ['get', 'put']

    # permission_classes = (SaveFirstShowThenRequireAuthentication,)

    def get_queryset(self):
        user = get_user(self)

        package = get_packages(user)

        return package


def eval_string(d):
    d['guidebox_data'] = eval(d['guidebox_data'])

    return d

@try_catch
def call_search_microservice(request):
    from tornado import escape

    if request.GET['q']:
        query_url = "{base}/search/?{params}".format(base=get_env_variable('DATA_MICROSERVICE_URL'),
                                                     params=urllib.parse.urlencode({'q': request.GET['q']}))
        try:

            with urllib.request.urlopen(query_url) as response:

                x = json.loads(response.read().decode())
                xx = [eval_string(d) for d in x]
                return JsonResponse(x, safe=False)
        except:
            pass

@try_catch
@api_json_post
def get_service_list(request, the_json, path):
    query_url = ""

    if path == 'servicelist':
        query_url = "{base}/service_list".format(base=get_env_variable('NODE_DATA_SERVICE'))

    if path == 'checkoutlist':
        query_url = "{base}/checkout_list".format(base=get_env_variable('NODE_DATA_SERVICE'))

    if path == 'detailsources':
        query_url = "{base}/detail_sources".format(base=get_env_variable('NODE_DATA_SERVICE'))

    try:
        headers = {'Content-Type': 'application/json'}
        r = requests.post(query_url, data=json.dumps(the_json), headers=headers)
        d = r.json()

        d = json.dumps(d)
        d = json.loads(d)
        return JsonResponse(d, safe=False)
    except Exception as e:
        print(e)

@try_catch
def get_service_description(request, service):
    if request.method == 'GET':
        query_url = "{base}{path}".format(base=get_env_variable('DATA_MICROSERVICE_URL'), path=request.path)
        try:
            r = requests.get(query_url)
            return JsonResponse(r.json(), safe=False)
        except Exception as e:
            print(e)



@csrf_exempt
@strategy('social:complete')
def complete(request, backend, *args, **kwargs):
    """Override this method so we can force user to be logged out."""
    return do_complete(request.social_strategy, _do_login, user=None,
                       redirect_name='/', *args, **kwargs)
