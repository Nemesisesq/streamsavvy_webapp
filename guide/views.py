import json
import urllib
from multiprocessing.dummy import Pool

import re
import requests
from django.core.cache import cache
from django.http import JsonResponse
from fuzzywuzzy import fuzz
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from guide.models import RoviListings, RoviGridSchedule, RoviProgramImages
from guide.serializers import RoviGridScheduleSerializers
from server.auth import check_token, JWTAuthentication
from server.constants import sling_channels
from server.shortcuts import lazy_thunkify
from server.views import method_name
from streamsavvy_webapp.settings import get_env_variable


class RoviAPI(object):
    api_key = '9d4zzdxbzvguqgykwjnz2g7n'
    BASE_URL = 'http://api.rovicorp.com/TVlistings/v9/listings/'

    @classmethod
    def get_images_url(cls, program_id):
        program_detail_url = "{}programdetails/{}/info?".format(cls.BASE_URL, program_id)
        params = {'local': 'en-US',
                  'copytextformat': 'PlainText',
                  'include': 'Image',
                  'imagecount': 10,
                  'duration': 20160,
                  'format': 'json',
                  'apikey': cls.api_key,
                  }

        url = program_detail_url + urllib.parse.urlencode(params)

        return url

    @classmethod
    def get_listings_for_zip_code(cls, zip):

        listing_url = "{}services/postalcode/{}/info?".format(cls.BASE_URL, zip)
        params = {'locale': 'en-US', 'countrycode': 'US', 'format': 'json', 'apikey': cls.api_key}

        url = listing_url + urllib.parse.urlencode(params)

        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')
            return the_json
        except urllib.error.URLError as e:
            print(e)
            return False

    @classmethod
    def retrieve_schedule_from_db(cls, zipcode):
        return RoviGridSchedule.objects.filter(postal_code=zipcode).order_by("-date_added")[:2]

    @classmethod
    def get_schdule_from_rovi_api(cls, service_id):

        listing_url = "{}gridschedule/{}/info?".format(cls.BASE_URL, service_id)
        params = {'locale': 'en-US', 'duration': 60, 'includechannelimages': 'true', 'format': 'json',
                  'apikey': cls.api_key}

        url = listing_url + urllib.parse.urlencode(params)

        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')
            return the_json
        except urllib.error.URLError as e:
            print(e)
            return False

    @classmethod
    def save_listing(cls, zip, x):
        r = RoviListings.objects.get_or_create(service_id=x['ServiceId'], postal_code=zip, locale='en-US', country='US',
                                               data=x)

        return r[0]

    @classmethod
    def retrive_listing(cls, zip):
        return RoviListings.objects.filter(postal_code=zip)

    @classmethod
    def save_channel_grid(cls, zip, grid):

        g = RoviGridSchedule.objects.get_or_create(
            listing=RoviListings.objects.get(service_id=str(grid['GridScheduleResult']['ServiceId']), postal_code=zip),
            locale='en-US', data=grid, postal_code=zip)
        return g[0]


@lazy_thunkify
def filter_sling_channels(chan):
    for i in sling_channels:
        z = chan['CallLetters']
        if fuzz.token_set_ratio(chan['SourceLongName'], i) > 95 and not re.search("HD", chan['CallLetters']):
            return True
    return False




def get_guide(request, lat, long):


    # if not JWTAuthentication().authenticate(request):
    #     return Response({'reason': 'Invalid token'}, status.HTTP_401_UNAUTHORIZED)


    if request.method == 'GET':
        query_url = "{base}/api/guide/{lat}/{long}".format(base=get_env_variable('DATA_MICROSERVICE_URL'), lat=lat, long=long)

        try:
            r = requests.get(query_url)

            return JsonResponse(r.json(), safe=False)
        except Exception as e:
            print(e)
