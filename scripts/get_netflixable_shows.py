__author__ = 'Nem'

import urllib.request


import django
import django_rq

from server.populate_data.netflixable import *
from server.models import Content

try:
    django.setup()
except:
    pass




def chunks(l, n):
    for i in range(0, len(l), n):
        yield l[i:i + n]


def get_shows(x):
    print(x)


def run(*args, **kwargs):
    # create instance of netflixable
    if len(args) <= 0:
        host = 'http://usa.netflixable.com'

        with urllib.request.urlopen(host) as response:
            soup = BeautifulSoup(response, 'html.parser')

        def alpha_list(href):
            return href and re.compile("alphabetical-list").search(href)

        ref_list = soup.find_all(href=alpha_list)

        url = 'http://usa.netflixable.com/2016/01/complete-alphabetical-list-sat-jan-23.html'




    else:
        url = args[0]

    q = django_rq.get_queue('high')

    n = Netflixable(url)

    shows = chunks(n.get_shows_from_soup(), 20)

    # shows = Content.objects.all()

    for i in shows:
        q.enqueue(n.process_shows, i)

    return 'all jobs started!!!'

#
# if __name__ == "__main__":
#     run()
