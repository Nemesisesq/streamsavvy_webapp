import json
import os
import urllib
import urllib.error
import urllib.request
import threading
from queue import Queue
import time

from django.db.models import Q
from django.db import IntegrityError
from django.core import serializers
from django.utils import timezone
import yaml

from server.models import Content, ContentProvider
from cutthecord.settings import BASE_DIR


class GuideBox:
    API_URL = 'api-public.guidebox.com'
    VERSION = 'v1.43'
    REGION = 'US'
    API_KEY = 'rKWvTOuKvqzFbORmekPyhkYMGinuxgxM'
    BASE_URL = "http://{API_URL}/{VERSION}/{REGION}/{API_KEY}".format(API_URL=API_URL, VERSION=VERSION, REGION=REGION,
                                                                      API_KEY=API_KEY)
    # def __init__(self):

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
        content = Content.objects.all()

        for c in content:
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

    def get_content(self, index):
        url = "{BASE_URL}/shows/all/{index}/250/all/all".format(BASE_URL=self.BASE_URL, index=index)
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
        for x in range(int(total_results / 250) + 1):

            index = x * 250

            shows = self.get_content(index)
            if shows:
                shows_dict = json.loads(shows)

                for i in shows_dict['results']:
                    show_count += 1
                    # TODO iterate through the list of results and add them to the database.
                    c = Content.objects.get_or_create(guidebox_id=i['id'])

                    if isinstance(c, tuple):
                        c = c[0]

                    c.title = i['title']
                    # c.guidebox_id = i['id']
                    c.thumbnail_small = i['artwork_208x117']
                    c.thumbnail_medium = i['artwork_304x171']
                    c.thumbnail_large = i['artwork_448x252']
                    c.thumbnail_x_large = i['artwork_608x342']

                    try:
                        c.save()
                        print("{0} was saved".format(c))
                    except IntegrityError as e:
                        print(e)

        return show_count

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

                            # for provider in provider_detail['results']['web']['episodes']['all_sources']:
                            #
                            # p = ContentProvider.objects.get_or_create(name=provider['display_name'])
                            #
                            # if isinstance(p, tuple):
                            # p = p[0]
                            #
                            # worker.content_provider.add(p)

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

        t = threading.Thread(target=threader)
        t.daemon = True
        t.start()

        start = time.time()
        for worker in Content.objects.all():
            request_q.put(worker)

        request_q.join()

        print("Entire Job took {}".format(time.time() - start))


    def populate_content_detail_multithreaded_extra(self):

        db_lock = threading.Lock()

        def save_show_detail(worker):
            # time.sleep(1)
            # detail = json.loads(self.get_content_detail(worker.guidebox_id))
            time.sleep(1)
            provider_detail = json.loads(self.get_episode_details(worker.guidebox_id))
            with db_lock:
                try:
                    # worker.description = detail['overview']
                    # print("saving {worker} on thread {thread} hello world".format(worker=worker,
                    # thread=threading.current_thread().name))
                    #
                    # for channel in detail['channels']:
                    #
                    # provider = ContentProvider.objects.get_or_create(name=channel['name'])
                    #
                    # if isinstance(provider, tuple):
                    # provider = provider[0]
                    #
                    #     provider.guidebox_id = int(channel['id'])
                    #     provider.channel_type = channel['channel_type']
                    #     provider.thumbnail_small = channel['artwork_208x117']
                    #     provider.thumbnail_medium = channel['artwork_304x171']
                    #     provider.thumbnail_large = channel['artwork_448x252']
                    #     provider.thumbnail_x_large = channel['artwork_608x342']
                    #
                    #     # print(provider.to_dict())
                    #     provider.save()
                    #
                    #     worker.content_provider.add(provider)
                    #
                    #     worker.save()

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


class Providers(object):
    def get_sources_info(self):

        start_time = time.time()
        sources = json.loads(GuideBox().get_sources())
        print(sources)

        for source in sources['results']:
            cp = ContentProvider.objects.get_or_create(name=source['display_name'])

            if isinstance(cp, tuple):
                cp = cp[0]

            cp.source = source['source']
            cp.payment_type = source['type']
            cp.home_url = source['info']
            cp.apple_app = source['ios_app']
            cp.android_app = source['android_app']

            cp.save()

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
