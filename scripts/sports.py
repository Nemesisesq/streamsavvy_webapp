from server.models import Content, ContentProvider

__author__ = 'Nem'

import django
import django_rq

try:
    django.setup()
except:
    pass

sling_dict = {
    'channel_type': "online",
    'description': None,
    'guidebox_id': None,
    'home_url': "http://www.sling.com",
    'image_url': None,
    'mem_cost': None,
    'name': "SlingTv",
    'payment_type': "Subscription",
    'retail_cost': None,
    'source': "sling_tv",
}

sling = ContentProvider.objects.get_or_create(**sling_dict)[0]

sports = [
    {'title': 'Football',
     'description': "American football (referred to as football in the United States and Canada, also known as gridiron elsewhere) is a sport played by two teams of eleven players on a rectangular field with goalposts at each end. The offense, the team with control of the oval-shaped football, attempts to advance down the field by running with or passing the ball, while the team without control of the ball, the defense, aims to stop their advance and take control of the ball for themselves. The offense must advance at least ten yards in four downs, or plays, or else they turn over the football to the opposing team; if they succeed, they are given a new set of four downs. Points are primarily scored by advancing the ball into the opposing team's end zone for a touchdown or kicking the ball through the opponent's goalposts for a field goal. The team with the most points at the end of a game wins.",
     'home_url': 'http://www.nfl.com'}
]


def create_sport(s):
    c = Content.objects.get_or_create(**s)[0]
    c.content_provider.add(sling).save()


def run():
    q = django_rq.get_queue('low')

    for s in sports:
       create_sport(s)


import os

if 'DEBUG' in os.environ:
    run()
