__author__ = 'Nem'
import django
import django_rq

from server.populate_data.guidebox import *
from server.populate_data.netflixable import *

django.setup()

def run():

    q = django_rq.get_queue('high')
    # get shows by source

    q.enqueue(get_shows_by_source)


    return "set shows queued!"


