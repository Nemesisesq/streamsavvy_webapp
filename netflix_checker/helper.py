import json
import logging

import re
from django.db.models import Q
from fuzzywuzzy import fuzz

from server.models import Content
from server.shortcuts import try_catch

logger = logging.getLogger('cutthecord')

def process_show_dict_list(n_shows_list, n):
    for x in n_shows_list:
        process_show_dict(x, n)

    logger.debug('All show dictionary lists from netflixable are queued')

def process_show_dict(i, n):
    q = None
    i = json.loads(i)
    title = get_title_from_detail(n, i)
    if title:
        i['show'] = title
    q = get_query(i, q)
    if q:
        match_for_netflixable(i, q)


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
    cleaned_show = re.sub('Season\s-\s\d+', '', i['show'])
    res = [(show, fuzz.token_sort_ratio(show.title, cleaned_show)) for show in res]

    def getVal(item):
        return item[1]

    res = sorted(res, key=getVal)[::-1]
    return res


def get_query(i, q):

    for word in i['show'].split():
        if word.lower() not in ['of', 'the', 'season', "-"]:
            if q:
                q = q | Q(title__icontains=word)
            else:
                q = Q(title__icontains=word)
    return q

@try_catch
def get_title_from_detail(n,show_dict):
    res = n.get_netflixable_show_detail(show_dict['link'])
    title = res.find('h3', class_='post-title').string

    return title
