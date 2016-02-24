import json
import logging
import os
# import threading
import time
import urllib
import urllib.error
import urllib.request
from datetime import timedelta
# from queue import Queue

import yaml
from django.core import serializers
from django.db.models import Q
from django.utils import timezone

from streamsavvy_webapp.settings import BASE_DIR
from server.models import Content, Channel, Images


class GuideBox(object):
    API_URL = 'api-public.guidebox.com'
    VERSION = 'v1.43'
    REGION = 'US'
    API_KEY = 'rKWvTOuKvqzFbORmekPyhkYMGinuxgxM'
    BASE_URL = "http://{API_URL}/{VERSION}/{REGION}/{API_KEY}".format(API_URL=API_URL, VERSION=VERSION, REGION=REGION,
                                                                      API_KEY=API_KEY)

    # def __init__(self):

    def get_total_number_of_shows(self):
        response = self.get_content_list(0)
        dict = json.loads(response)
        return dict['total_results']

    def get_total_number_of_channels(self):
        response = self.get_channel_list()
        dict = json.loads(response)
        return dict['total_results']

    def get_show_by_title(self, title):
        cleaned_title = title.replace("  ", " ")
        encoded_show = cleaned_title.strip().replace(" ", '%25252B')
        fuzzy_url = "{BASE_URL}/search/title/{TRIPLE_URL}/fuzzy".format(BASE_URL=self.BASE_URL, TRIPLE_URL=encoded_show)
        try:
            with urllib.request.urlopen(fuzzy_url) as exact_response:
                the_json = json.loads(exact_response.read().decode('utf-8'))
            return the_json
        except:
            pass

    def get_sources(self):
        url = "{BASE_URL}/sources/all/all".format(BASE_URL=self.BASE_URL)
        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')
            return the_json
        except urllib.error.URLError as e:
            print(e)
        return False

    def get_channels(self, content_id):
        url = "{BASE_URL}/show/{id}/available_content".format(BASE_URL=self.BASE_URL, id=content_id)
        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')
            return the_json
        except urllib.error.URLError as e:
            print(e)
            return False

    def get_content_detail(self, content_id):
        url = "{BASE_URL}/show/{id}".format(BASE_URL=self.BASE_URL, id=content_id)
        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')
            return the_json
        except urllib.error.URLError as e:
            print(e)
            return False

    def get_content_list(self, index, **kwargs):
        source = kwargs['source'] if 'source' in kwargs else 'all'
        platform = kwargs['platform'] if 'platform' in kwargs else  'all'
        url = "{BASE_URL}/shows/all/{index}/250/{source}/{platform}".format(BASE_URL=self.BASE_URL,
                                                                            index=index,
                                                                            source=source,
                                                                            platform=platform)
        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')
            return the_json
        except urllib.error.URLError as e:
            print(e)
            return False

    def single_populate_additional_sources(self, c):
        # time.sleep(1)
        # detail = json.loads(self.get_content_detail(worker.guidebox_id))
        time.sleep(1)
        provider_detail = json.loads(self.get_episode_details(c.guidebox_id))
        try:
            for provider in provider_detail['results']['web']['episodes']['all_sources']:
                p = Channel.objects.get_or_create(name=provider['display_name'])
                if isinstance(p, tuple):
                    p = p[0]
                c.content_provider.add(p)
                c.save()

        # TODO set up logging for this exception
        except Exception as e:
            print(e)

    def populate_content(self):
        total_results = json.loads(self.get_content_list(0))['total_results']
        show_count = 0
        loop = True
        count = 0
        while loop:
            index = count * 250
            results = json.loads(self.get_content_list(index))
            if results['total_returned']:
                shows_dict = results['results']
                for i in shows_dict:
                    show_count += 1
                    self.save_content(i)
                count += 1
            else:
                loop = False

        return show_count

    def get_episode_details(self, content_id):
        url = "{BASE_URL}/show/{id}/available_content".format(BASE_URL=self.BASE_URL, id=content_id)

        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')
            return the_json
        except urllib.error.URLError as e:
            print(e)
            return False

    def save_content(self, the_json):

        c = Content.objects.get_or_create(guidebox_data__id=the_json['id'])

        content = c[0]
        content.title = the_json['title']
        content.guidebox_data = the_json
        try:
            content.save()
            print("{0} was saved".format(c))
        except Exception as e:
            print(e)

        return content

    def save_images(self, i):
        obj = Images()

        obj.thumbnail_small = i['artwork_208x117'] if i['artwork_208x117'] else None
        obj.thumbnail_medium = i['artwork_304x171'] if i['artwork_304x171'] else None
        obj.thumbnail_large = i['artwork_448x252'] if i['artwork_448x252'] else None
        obj.thumbnail_x_large = i['artwork_608x342'] if i['artwork_608x342'] else None

        if obj.save():
            return i

    def get_channel_list(self, type='all', start=0, limit=50):
        url = "{BASE_URL}/channels/{type}/{start}/{limit}".format(BASE_URL=self.BASE_URL, type=type, start=start,
                                                                  limit=limit)

        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')
            return the_json
        except urllib.error.URLError as e:
            print(e)
            return False

    def save_channel(self, the_json):

        c = Channel.objects.get_or_create(guidebox_data__id=the_json['id'])
        chan = c[0]

        chan.name = the_json['name'] if the_json['name'] else None
        chan.guidebox_data = the_json

        chan.save()

        return chan


# This Class is meant to flesh out provider details
class Providers(object):
    def get_sources_info(self):

        logger = logging.getLogger('cutthecord')

        start_time = time.time()
        sources = json.loads(GuideBox().get_sources())
        print(sources)

        for source in sources['results']:
            cp = Channel.objects.get_or_create(name=source['display_name'])

            if isinstance(cp, tuple):
                cp = cp[0]
            try:

                cp.guidebox_id = source['id']
                cp.source = source['source']
                cp.payment_type = source['type']
                cp.home_url = source['info']
                cp.apple_app = source['ios_app']
                cp.android_app = source['android_app']

                cp.save()

            except Exception as e:

                logger.debug(e)

        print("entire job too {time}".format(time=time.time() - start_time))

    def export_paid_providers(self):

        provider_file = os.path.join(BASE_DIR, 'provider_prices.yaml')

        data = serializers.serialize('yaml',
                                     Channel.objects.filter(
                                         Q(payment_type='purchase') | Q(payment_type='subscription')),
                                     fields=('name', 'channel_type', 'retail_cost', 'payment_type'))

        with open(provider_file, "wb") as file_descriptor:
            file_descriptor.write(bytes(data, 'UTF-8'))
            file_descriptor.close()

    def import_paid_providers(self):

        provider_file = os.path.join(BASE_DIR, 'provider_prices.yaml')

        with open(provider_file, 'r') as file_descriptor:
            data = yaml.load(file_descriptor)

        for i in data:
            cp = Channel.objects.get(pk=i['pk'])
            if cp.retail_cost is None:
                cp.retail_cost = i['fields']['retail_cost']
                cp.save()


def get_shows_by_source():
    provider_class = Providers()
    guidebox_class = GuideBox()

    logger = logging.getLogger('cutthecord')

    provider_class.get_sources_info()

    content_providers = Channel.objects.all()

    for cp in content_providers.order_by('-modified'):

        if cp.guidebox_id and cp.source:

            count = 0
            loop = True
            while loop:

                index = count * 250
                results = json.loads(guidebox_class.get_content(index, source=cp.source, platform='all'))

                if results['total_returned']:

                    for i in results['results']:
                        content_tup = Content.objects.get_or_create(guidebox_id=i['id'])
                        try:

                            if content_tup[1]:
                                logger.debug("new show added {} ".format(content_tup[0]))

                            content = content_tup[0]
                            if content.modified and not content_tup[1]:
                                t = timezone.now() - content.modified
                            else:
                                t = timedelta.max

                            if t.total_seconds() > 0:
                                content = guidebox_class.save_content(i)

                            content.content_provider.add(cp)

                            content.save()

                            logger.debug('saving {}'.format(content))

                        except Exception as e:
                            logger.debug(e.with_traceback())

                        finally:
                            count += 1
                            logger.info("{} finished".format(cp))
                            print("{} finished".format(cp))
                else:
                    loop = False
