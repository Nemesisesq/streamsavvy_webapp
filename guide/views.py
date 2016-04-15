import json
import urllib

from django.core.cache import cache
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
        r = RoviListings.objects.get_or_create(service_id=x['ServiceId'], postal_code=zip, locale='en-US', country='US',
                                               data=x)

        return r[0]

    @classmethod
    def save_channel_grid(cls, zip, grid):

        g = RoviGridSchedule.objects.get_or_create(
            listing=RoviListings.objects.get(service_id=str(grid['GridScheduleResult']['ServiceId']), postal_code=zip),
            locale='en-US', data=grid, postal_code=zip)
        return g[0]


class RoviChannelGridView(APIView):
    def get(self, request, zip, format=None):

        if cache.get(zip):
            return Response(cache.get(zip))

        service_listings = RoviListings.objects.filter(postal_code=zip)

        if not service_listings:
            s = RoviAPI.get_listings_for_zip_code(zip)

            s = json.loads(s)['ServicesResult']['Services']['Service']

            service_listings = [RoviAPI.save_listing(zip, x) for x in s]

        broadcast_services = [x for x in service_listings if x.data['Type'] ==  'Broadcast']
        satellite_services = [x for x in service_listings if x.data['SystemName'] =='Dish Network']


        relevant_services = [broadcast_services[0], satellite_services[0]]
        res = [RoviAPI.get_grid_listings(serv) for serv in relevant_services]

        grid_list = [json.loads(the_json) for the_json in res]

        show_grids = [RoviAPI.save_channel_grid(zip, grid) for grid in grid_list]

        serializer = RoviGridScheduleSerializers(show_grids, many=True)

        cache.set(zip, serializer.data, timeout=600)

        return Response(serializer.data)
