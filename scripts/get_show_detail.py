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


    data = iter(content)

    while True:
        if q.count < 2000:
            try:
                q.enqueue(g.single_content_detail, next(data))
            except StopIteration:
                logger.info('all jobs started')
                break

    return 'all jobs started!!!'

#
# if __name__ == "__main__":
#     run()

import os

if 'DEBUG' in os.environ and os.environ['DEBUG']:
    run()
