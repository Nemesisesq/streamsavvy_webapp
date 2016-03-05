import json

import django_rq

from server.apis.guidebox import GuideBox
from server.models import Channel


def inital_database_population_of_content():
    g = GuideBox()
    q = django_rq.get_queue('low')
    result = []

    total_shows = g.get_total_number_of_shows()

    for i in range(0, total_shows, 250):
        show_list = g.get_content_list(i)
        shows_dict = json.loads(show_list)

        for show in shows_dict['results']:
            q.enqueue(g.save_content, show)

            result.append(show)

    return result


def inital_database_population_of_channels():
    g = GuideBox()
    q = django_rq.get_queue('low')
    result = []

    total_channels = g.get_total_number_of_channels()

    for i in range(0, total_channels, 24):
        channel_list = g.get_channel_list('all', i)
        channel_dict = json.loads(channel_list)

        for chan in channel_dict['results']:
            q.enqueue(g.save_channel, chan)

            result.append(chan)

    return result



def connect_content_channel_task():
    g = GuideBox()
    q_low = django_rq.get_queue('low')
    q_high = django_rq.get_queue('high')
    print('im splitting stuff')

    all_channels = Channel.objects.all()
    count = 0
    for i in [all_channels[i:i + 5] for i in range(0, len(all_channels), 5)]:
        count += 5
        if count % 2 == 0:
            q_high.enqueue(g.connect_channels_shows, i)
        else:
            q_low.enqueue(g.connect_channels_shows, i)
