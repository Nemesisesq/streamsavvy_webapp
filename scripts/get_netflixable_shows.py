import re

__author__ = 'Nem'

import urllib.request

from server.populate_data.netflixable import *


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


    n = Netflixable(url)

    n.process_shows()
