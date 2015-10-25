import re

__author__ = 'Nem'

import urllib.request
import django

from server.populate_data.netflixable import *

from rq import Queue

from worker import conn

try:
    django.setup()
except:
    pass

def chunks(l, n):
    for i in range(0, len(l), n):
        yield l[i:i+n]


def run(*args, **kwargs):
    # create instance of netflixable
    if len(args) == 0:
        host = 'http://usa.netflixable.com'

        with urllib.request.urlopen(host) as response:
            soup = BeautifulSoup(response, 'html.parser')

        def alpha_list(href):
            return href and re.compile("alphabetical-list").search(href)

        ref_list = soup.find_all(href=alpha_list)

        url = host + ref_list[0].get('href')



    else:
        url = args[0]

    q = Queue(connection=conn)

    n = Netflixable(url)

    shows = n.get_shows_from_soup()

    list = chunks(shows, 100)


    for i in list:
        q.enqueue_call(func=n.process_shows(i), timeout=6000)

    return 'all jobs started!!!'

