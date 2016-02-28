import logging
import time
import urllib.error
import urllib.request

from bs4 import BeautifulSoup
from fuzzywuzzy import fuzz

from server.apis.guidebox import GuideBox
from server.models import Content, Channel


class Netflixable():
    logger = logging.getLogger('cutthecord')

    g = GuideBox()

    def __init__(self, url):
        self.url = url

    def get_netflix_list(self):
        try:
            with urllib.request.urlopen(self.url) as response:
                t1 = time.time()
                soup = BeautifulSoup(response, 'lxml')
                print(time.time() - t1)

                self.logger.debug('successfully got soup')
            return soup
        except urllib.error.URLError as e:
            print(e)

    def get_shows_from_soup(self):
        soup = self.get_netflix_list()

        listings = soup.find_all(class_='listings')

        anchor_tags = []
        for listing in listings:
            for tag in listing('a'):
                anchor_tags.append(tag)

        def f(tag):
            return tag.string != 'imdb'

        shows = filter(f, anchor_tags)

        result = map(lambda x: str(x.string), shows)

        return list(result)

    def process_shows(self, shows):

        # shows = self.get_shows_from_soup()

        p = Channel.objects.get_or_create(name='Netflix')[0]

        for show in shows:
            print("{} is the current show".format(show))
            try:

                show_detail = self.g.get_show_by_title(show)

                print(show_detail)

                if show_detail['total_results'] != 0:

                    matching_shows = [s for s in show_detail['results'] if fuzz.token_sort_ratio(show, s['title']) > 80]

                    self.logger.debug('new show {}'.format(show))

                    if matching_shows:

                        try:
                            c_tuple = Content.objects.get_or_create(guidebox_id=i['id'])

                            content = c_tuple[0]

                            content = self.g.save_content(i)

                            content.content_provider.add(p)

                            if not content.title:
                                self.logger.debug('blank show?')

                            content.save()
                            # self.logger()

                        except ValueError as e:
                            self.logger.debug(e)

            except Exception as e:
                print(e)
