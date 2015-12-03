import logging

from server.populate_data.guidebox import GuideBox

__author__ = 'Nem'

import urllib.request


import django
import django_rq

from server.models import Content

try:
    django.setup()
except:
    pass



#
# def chunks(l, n):
#     for i in range(0, len(l), n):
#         yield l[i:i + n]


# def get_shows(x):
#     print(x)


def run(*args, **kwargs):
    # create instance of guidebox
    logger = logging.getLogger('cutthecord')

    g = GuideBox()


    logger.info('running the detail script')

    content = Content.objects.all()

    q = django_rq.get_queue('high')


    for c in content:
        q.enqueue(g.single_populate_additional_sources, c)

    return 'all jobs started!!!'