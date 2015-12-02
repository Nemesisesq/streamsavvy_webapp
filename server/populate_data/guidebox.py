from datetime import timedelta
import json
import logging
import os
import urllib
import urllib.error
import urllib.request
import threading
from queue import Queue
import time

from django.db.models import Q
from django.core import serializers

from django.utils import timezone
import yaml

from server.models import Content, ContentProvider
from cutthecord.settings import BASE_DIR


class GuideBox(object):
    API_URL = 'api-public.guidebox.com'
    VERSION = 'v1.43'
    REGION = 'US'
    API_KEY = 'rKWvTOuKvqzFbORmekPyhkYMGinuxgxM'
    BASE_URL = "http://{API_URL}/{VERSION}/{REGION}/{API_KEY}".format(API_URL=API_URL, VERSION=VERSION, REGION=REGION,
                                                                      API_KEY=API_KEY)
    # def __init__(self):

    def get_show_by_title(self, title):
        time.sleep(1)
        cleaned_title = title.replace("  ", " ")
        encoded_show = cleaned_title.strip().replace(" ", '%25252B')

        # exact_url = "{BASE_URL}/search/title/{TRIPLE_URL}/exact".format(BASE_URL=self.BASE_URL, TRIPLE_URL=encoded_show)
        fuzzy_url = "{BASE_URL}/search/title/{TRIPLE_URL}/fuzzy".format(BASE_URL=self.BASE_URL, TRIPLE_URL=encoded_show)

        try:
            with urllib.request.urlopen(fuzzy_url) as exact_response:
                the_json = json.loads(exact_response.read().decode('utf-8'))

                if the_json['total_results'] == 0:
                    with urllib.request.urlopen(fuzzy_url) as fuzzy_response:
                        the_json = json.loads(fuzzy_response.read().decode('utf-8'))

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

    def get_content_detail(self, content_id):
        url = "{BASE_URL}/show/{id}".format(BASE_URL=self.BASE_URL, id=content_id)
        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')
            return the_json
        except urllib.error.URLError as e:
            print(e)
            return False

    def populate_content_detail(self):
        # Grab all the Content
        content = Content.objects.all()


        # Iterate through the Content list and get details for them.
        for c in content:

            # get content details and parse the json
            detail = json.load(self.get_content_detail(c.guidebox_id))

            c.description = detail['overview']

            try:
                for channel in detail['channels']:

                    provider = ContentProvider.object.get_or_create(name=channel['name'])

                    if isinstance(provider, tuple):
                        provider = provider[0]

                    provider.guidebox_id = int(channel['id'])
                    provider.channel_type = channel['channel_type']
                    provider.thumbnail_small = channel['artwork_208x117']
                    provider.thumbnail_medium = channel['artwork_304x171']
                    provider.thumbnail_large = channel['artwork_448x252']
                    provider.thumbnail_x_large = channel['artwork_608x342']

                    print(provider.to_dict())
                    provider.save()

                    c.content_provider.add(provider)
            except Exception as e:
                print(e)

            c.save()
    def single_content_detail(self, c):

                # get content details and parse the json
                detail = json.loads(self.get_content_detail(c.guidebox_id))

                c.description = detail['overview']

                try:
                    for channel in detail['channels']:

                        provider = ContentProvider.objects.get_or_create(name=channel['name'])

                        if isinstance(provider, tuple):
                            provider = provider[0]

                        provider.guidebox_id = int(channel['id'])
                        provider.channel_type = channel['channel_type']
                        provider.thumbnail_small = channel['artwork_208x117']
                        provider.thumbnail_medium = channel['artwork_304x171']
                        provider.thumbnail_large = channel['artwork_448x252']
                        provider.thumbnail_x_large = channel['artwork_608x342']

                        print(provider.to_dict())
                        provider.save()

                        c.content_provider.add(provider)
                except Exception as e:
                    print(e)

                c.save()

    # Call the guidebox api and get

    def single_populate_additional_shows(self, c ):
            # time.sleep(1)
            # detail = json.loads(self.get_content_detail(worker.guidebox_id))
            time.sleep(1)
            provider_detail = json.loads(self.get_episode_details(c.guidebox_id))

            try:


                for provider in provider_detail['results']['web']['episodes']['all_sources']:

                    p = ContentProvider.objects.get_or_create(name=provider['display_name'])

                    if isinstance(p, tuple):
                        p = p[0]

                    c.content_provider.add(p)

                    c.save()

            #         print("{worker} description saved {p}".format(worker=worker, p=p))
            #
            #
            except Exception as e:
               print(e)
               pass
            #
            finally:
               print("releasing lock")

    def get_content(self, index, **kwargs):

        source = kwargs['source'] if kwargs['source'] else 'all'
        platform = kwargs['platform'] if kwargs['platform'] else 'all'
        url = "{BASE_URL}/shows/all/{index}/250/{source}/{platform}".format(BASE_URL=self.BASE_URL,
                                                                            index=index,
                                                                            source=source,
                                                                            platform=platform)
        time.sleep(1.0)
        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')

            return the_json
        except urllib.error.URLError as e:
            print(e)
            return False

    def populate_content(self):

        total_results = json.loads(self.get_content(0))['total_results']
        show_count = 0
        loop = True

        count = 0
        while loop:

            index = count * 250

            results = json.loads(self.get_content(index))
            if results['total_returned']:
                shows_dict = results['results']

                for i in shows_dict:
                    show_count += 1

                    self.save_content(i)
                    # TODO iterate through the list of results and add them to the database.
                    # c = Content.objects.get_or_create(guidebox_id=i['id'])
                    #
                    # if isinstance(c, tuple):
                    #     content = c[0]
                    #
                    # content.title = i['title']
                    # content.guidebox_id = i['id']
                    # content.imdb_id = i['imdb_id']
                    # content.freebase_id = i['freebase']
                    # content.tvdb_id = i['tvdb']
                    # content.tvrage_id = i['tvrage']['tvrage_id']
                    # content.wikepedia_id = i['wikepedia_id']
                    # content.themoviedb_id = i['themoviedb']
                    #
                    # content.thumbnail_small = i['artwork_208x117']
                    # content.thumbnail_medium = i['artwork_304x171']
                    # content.thumbnail_large = i['artwork_448x252']
                    # content.thumbnail_x_large = i['artwork_608x342']
                    # content.home_url = i['url']
                    #
                    # try:
                    #     content.save()
                    #     print("{0} was saved".format(c))
                    # except Exception as e:
                    #     print(e)

                count += 1
            else:
                loop = False

        return show_count

    # gets detail for content in a multi threaded fashion but is limtied becaue of the guide box API
    def populate_content_detail_multithreaded(self):

        db_lock = threading.Lock()

        def save_show_detail(worker):
            time.sleep(1)
            tdays = 0

            if worker.modified:
                time_dif = timezone.now() - worker.modified
                tdays = time_dif.days
            else:
                tdays = 11

            if tdays > 10:
                try:
                    detail = json.loads(self.get_content_detail(worker.guidebox_id))
                    # time.sleep(1)
                    # provider_detail = json.loads(self.get_episode_details(worker.guidebox_id))
                    with db_lock:
                        try:
                            worker.description = detail['overview']
                            print("saving {worker} on thread {thread} hello world".format(worker=worker,
                                                                                          thread=threading.current_thread().name))

                            for channel in detail['channels']:

                                provider_tup = ContentProvider.objects.get_or_create(name=channel['name'])

                                if isinstance(provider_tup, tuple):
                                    provider = provider_tup[0]
                                provider.guidebox_id = int(channel['id'])
                                provider.channel_type = channel['channel_type']
                                provider.thumbnail_small = channel['artwork_208x117']
                                provider.thumbnail_medium = channel['artwork_304x171']
                                provider.thumbnail_large = channel['artwork_448x252']
                                provider.thumbnail_x_large = channel['artwork_608x342']

                                # print(provider.to_dict())
                                provider.save()

                                worker.content_provider.add(provider)

                                worker.save()

                                print("{worker} description saved".format(worker=worker))


                        except Exception as e:
                            print(e)
                            pass

                        finally:
                            print("releasing lock")
                except Exception as e:
                    print("an Exceptioin {e} occured for Guidebox.Id {id} {worker}".format(e=e, id=worker.guidebox_id,
                                                                                           worker=worker))
                    pass

        def threader():
            while True:
                worker = request_q.get()
                save_show_detail(worker)
                print("worker {} done".format(worker))
                request_q.task_done()

        request_q = Queue()
        # db_q = Queue()

        # this is where we set the number of threads we're going to allow to do work.
        for x in range(0):
            t = threading.Thread(target=threader)
            t.daemon = True
            t.start()

        start = time.time()
        for worker in Content.objects.all():
            request_q.put(worker)

        request_q.join()

        print("Entire Job took {}".format(time.time() - start))

    # gets additional details for shows like the other providers that carry the content
    def populate_content_detail_multithreaded_extra(self):

        db_lock = threading.Lock()

        def save_show_detail(worker):
            # time.sleep(1)
            # detail = json.loads(self.get_content_detail(worker.guidebox_id))
            time.sleep(1)
            provider_detail = json.loads(self.get_episode_details(worker.guidebox_id))
            with db_lock:
                try:

                    for provider in provider_detail['results']['web']['episodes']['all_sources']:

                        p = ContentProvider.objects.get_or_create(name=provider['display_name'])

                        if isinstance(p, tuple):
                            p = p[0]

                        worker.content_provider.add(p)

                        worker.save()

                        print("{worker} description saved {p}".format(worker=worker, p=p))


                except Exception as e:
                    print(e)
                    pass

                finally:
                    print("releasing lock")

        def threader():
            while True:
                worker = request_q.get()
                save_show_detail(worker)
                print("worker {} done".format(worker))
                request_q.task_done()

        request_q = Queue()
        # db_q = Queue()

        t = threading.Thread(target=threader)
        t.daemon = True
        t.start()

        start = time.time()
        for worker in Content.objects.all():
            request_q.put(worker)

        request_q.join()

        print("Entire Job took {}".format(time.time() - start))

    def get_episode_details(self, content_id):
        url = "{BASE_URL}/show/{id}/available_content".format(BASE_URL=self.BASE_URL, id=content_id)

        try:
            with urllib.request.urlopen(url) as response:
                the_json = response.read().decode('utf-8')
            return the_json
        except urllib.error.URLError as e:
            print(e)
            return False

    def save_content(self, i):

        c = Content.objects.get_or_create(guidebox_id=i['id'])

        content = c[0]

        content.title = i['title']

        content.guidebox_id = i['id']
        if 'imdb_id' in i :
            content.imdb_id = i['imdb_id']
        if 'freebase' in i:
            content.freebase_id = i['freebase']
        if 'tvdb' in i:
            content.tvdb_id = i['tvdb']
        if 'tvrage' in i and 'tvrage_id' in i['tvrage']:
            content.tvrage_id = i['tvrage']['tvrage_id']
        if 'wikipedia_id' in i:
            content.wikepedia_id = i['wikipedia_id']
        if 'themoviedb' in i:
            content.themoviedb_id = i['themoviedb']

        content.thumbnail_small = i['artwork_208x117']
        content.thumbnail_medium = i['artwork_304x171']
        content.thumbnail_large = i['artwork_448x252']
        content.thumbnail_x_large = i['artwork_608x342']

        if 'url' in i:
            content.home_url = i['url']

        try:
            content.save()
            print("{0} was saved".format(c))
        except Exception as e:
            print(e)

        return content


# This Class is meant to flesh out provider details
class Providers(object):
    def get_sources_info(self):

        logger = logging.getLogger('cutthecord')

        start_time = time.time()
        sources = json.loads(GuideBox().get_sources())
        print(sources)

        for source in sources['results']:
            cp = ContentProvider.objects.get_or_create(name=source['display_name'])

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
                                     ContentProvider.objects.filter(
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
            cp = ContentProvider.objects.get(pk=i['pk'])
            if cp.retail_cost is None:
                cp.retail_cost = i['fields']['retail_cost']
                cp.save()


def get_shows_by_source():
    provider_class = Providers()
    guidebox_class = GuideBox()

    logger = logging.getLogger('cutthecord')

    provider_class.get_sources_info()

    content_providers = ContentProvider.objects.all()

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
                                # content.title = i['title']
                                # content.guidebox_id = i['id']
                                # content.imdb_id = i['imdb_id']
                                # content.freebase_id = i['freebase']
                                # content.tvdb_id = i['tvdb']
                                # content.tvrage_id = i['tvrage']['tvrage_id']
                                # content.wikepedia_id = i['wikipedia_id']
                                # content.themoviedb_id = i['themoviedb']
                                # content.thumbnail_small = i['artwork_208x117']
                                # content.thumbnail_medium = i['artwork_304x171']
                                # content.thumbnail_large = i['artwork_448x252']
                                # content.thumbnail_x_large = i['artwork_608x342']

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
