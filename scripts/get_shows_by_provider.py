__author__ = 'Nem'
import django
import django_rq

from server.apis.guidebox import *
from server.apis.netflixable import *

django.setup()

def run():

    q = django_rq.get_queue('high')
    # get shows by source

    q.enqueue(get_shows_by_source)


    return "set shows queued!"


