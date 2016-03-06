import json
import logging
# import threading
import urllib
import urllib.error
import urllib.request
# from queue import Queue

from fuzzywuzzy import fuzz

from server.constants import sling_channels
from server.models import Content, Channel, Images


class GuideBox(object):
    API_URL = 'api-public.guidebox.com'
    VERSION = 'v1.43'
    REGION = 'US'
    API_KEY = 'rKWvTOuKvqzFbORmekPyhkYMGinuxgxM'
    BASE_URL = "http://{API_URL}/{VERSION}/{REGION}/{API_KEY}".format(API_URL=API_URL, VERSION=VERSION, REGION=REGION,
                                                                      API_KEY=API_KEY)
    logger = logging.getLogger('cutthecord')

    # def __init__(self):

    def get_total_number_of_shows(self, **kwargs):
        response = self.get_content_list(0, **kwargs)
        dict = json.loads(response)
        return dict['total_results']

    def get_total_number_of_channels(self):
        response = self.get_channel_list()
        dict = json.loads(response)
        return dict['total_results']

    def get_show_by_title(self, title):
        cleaned_title = title.replace("  ", " ")
        title, sep, cruft = cleaned_title.partition("-")
        encoded_show = title.strip().replace(" ", '%25252B')
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
        channel = kwargs['channel'] if 'channel' in kwargs else 'all'
        source = kwargs['source'] if 'source' in kwargs else 'all'
        platform = kwargs['platform'] if 'platform' in kwargs else  'all'
        url = "{BASE_URL}/shows/{channel}/{index}/250/{source}/{platform}".format(BASE_URL=self.BASE_URL,
                                                                                  index=index,
                                                                                  channel=channel,
                                                                                  source=source,
                                                                                  platform=platform)
        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')
            return the_json
        except urllib.error.URLError as e:
            print(e)
            return False

    def add_additional_channels_for_show(self, shows):

        def execute(c):
            if c.guidebox_data:
                available_sources = json.loads(self.get_available_content_for_show(c.guidebox_data['id']))
                try:

                    c.guidebox_data['sources'] = available_sources['results']
                    c.save()

                # TODO set up logging for this exception
                except Exception as e:
                    print(e)

        if type(shows) is list:
            for c in shows:
                execute(c)
        else:
            execute(shows)


    # def populate_content(self):
        # total_results = json.loads(self.get_content_list(0))['total_results']
        # show_count = 0
        # loop = True
        # count = 0
        # while loop:
        #     index = count * 250
        #     results = json.loads(self.get_content_list(index))
        #     if results['total_returned']:
        #         shows_dict = results['results']
        #         for i in shows_dict:
        #             show_count += 1
        #             self.save_content(i)
        #         count += 1
        #     else:
        #         loop = False
        #
        # return show_count

    def get_available_content_for_show(self, content_id):
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

        matches = [c for c in sling_channels if fuzz.token_set_ratio(chan.name, c) >= 90]
        if matches:
            chan.is_on_sling = True

        chan.save()

        return chan

    def connect_channels_shows(self, channel_list):
        print(channel_list)
        for chan in channel_list:
            try:
                if chan.guidebox_data:
                    length = self.get_total_number_of_shows(channel=chan.guidebox_data['short_name'])
                    if length:
                        for i in range(0, length, 24):
                            res = self.get_content_list(i, channel=chan.guidebox_data['short_name'])
                            shows = json.loads(res)['results']
                            for show in shows:

                                try:
                                    c_tuple = Content.objects.get_or_create(guidebox_data__id=show['id'])
                                    if c_tuple[1]:
                                        content = self.save_content(show)
                                    else:
                                        content = c_tuple[0]

                                    content.channel.add(chan)

                                    content.save()
                                except Exception as e:
                                    print(e)
            except Exception as e:
                self.logger.error(e)
