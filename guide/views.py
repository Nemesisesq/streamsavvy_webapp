import json
import urllib

from django.db.models import Q
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView

from guide.models import RoviListings, RoviGridSchedule
from guide.serializers import RoviGridScheduleSerializers


class RoviAPI(object):
    api_key = 'rj5pcy96h2uee7gmesf755ay'
    BASE_URL = 'http://api.rovicorp.com/TVlistings/v9/listings/'

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
    def get_grid_listings(cls, service_id):

        listing_url = "{}gridschedule/{}/info?".format(cls.BASE_URL, service_id)
        params = {'locale': 'en-US', 'duration': 240, 'includechannelimages': 'true', 'format': 'json',
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
        r = RoviListings.objects.get_or_create(service_id=x['ServiceId'] ,postal_code=zip, locale='en-US', country='US', data=x)

        return r[0]

    @classmethod
    def save_channel_grid(cls, zip, grid):

        g = RoviGridSchedule.objects.get_or_create(
            listing=RoviListings.objects.get(service_id=str(grid['GridScheduleResult']['ServiceId'])),
            locale='en-US', data=grid, postal_code=zip)
        return g[0]


class RoviChannelGridView(APIView):
    def get(self, request, zip, format=None):

        service_listings = RoviListings.objects.filter(postal_code=zip)

        if not service_listings:
            s = RoviAPI.get_listings_for_zip_code(zip)

            s = json.loads(s)['ServicesResult']['Services']['Service']

            s = [RoviAPI.save_listing(zip, x) for x in s]
            s = [x for x in s if x.data['Type'] == 'Broadcast']

            res = [RoviAPI.get_grid_listings(serv) for serv in s]

            grid_list = [json.loads(the_json) for the_json in res]

            show_grids = [RoviAPI.save_channel_grid(zip, grid) for grid in grid_list]

            query = ''

            for i in show_grids:
                q = Q(pk=i.pk)

                if query:
                    query = query | q

                else:
                    query = q

            show_grids = RoviGridSchedule.objects.filter(query)

        else:

            ota_services = [s for s in service_listings if s.data['Type'] == 'Broadcast']

            query = ''

            for i in ota_services:
                q = Q(listing=i)

                if query:
                    query = query | q

                else:
                    query = q

            show_grids = RoviGridSchedule.objects.filter(query)

        serializer = RoviGridScheduleSerializers(show_grids, many=True)

        return Response(serializer.data)
