import json
import logging

import django_rq
from django.db.models import Q
from fuzzywuzzy import fuzz

from server.apis.guidebox import GuideBox
from server.apis.netflixable import Netflixable
from server.models import Channel, Content

logger = logging.getLogger('cutthecord')

def run_initial_netflix_population():
    n = Netflixable(' http://usa.netflixable.com/2016/01/complete-alphabetical-list-wed-jan-27.html')
    soup = n.get_shows_from_soup()
    q = None
    for i in soup:
        q = get_query(i, q)

        if q:
            match_for_netflixable(i, q)
        res = None
        q = None

    return('Initial Netflix Check Completed')


def match_for_netflixable(i, q):
    res = Content.objects.filter(q)
    if len(res) == 1 and fuzz.token_sort_ratio(res[0].title, i) > 90:
        res[0].on_netflix = True
        res[0].save()
        logger.info('{} is now known to be on netflix'.format(i))
        return



    elif len(res) > 1:
        res = sort_fuzzy_matches(i, res)

        if res and res[0][1] > 90:
            res[0][0].on_netflix = True
            res[0][0].save()
            return

    else:

        logger.debug('{} is not on netflix'.format(i))
        return


def sort_fuzzy_matches(i, res):
    res = [(show, fuzz.token_sort_ratio(show.title, i['show'])) for show in res]

    def getVal(item):
        return item[1]

    res = sorted(res, key=getVal)[::-1]
    return res


def get_query(i, q):
    for word in i['show'].split():
        if word.lower() not in ['of', 'the']:
            if q:
                q = q & Q(title__icontains=word)
            else:
                q = Q(title__icontains=word)
    return q



