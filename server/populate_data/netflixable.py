import urllib.request
import urllib.error
import logging
import re

from bs4 import BeautifulSoup

from server.models import Content, ContentProvider
from server.populate_data.guidebox import GuideBox


class Netflixable():
    logger = logging.getLogger('cutthecord')

    g = GuideBox()

    def __init__(self, url):
        self.url = url

    def get_list(self):
        try:
            with urllib.request.urlopen(self.url) as response:
                soup = BeautifulSoup(response, 'html.parser')

                self.logger.debug('successfully got soup')
            return soup
        except urllib.error.URLError as e:
            print(e)

    def get_shows_from_soup(self):
        soup = self.get_list()

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

        p = ContentProvider.objects.get_or_create(name='Netflix', channel_type='online', source='netflix')[0]

        for show in shows:
            print("{} is the current show".format(show))
            try:

                show = show.replace(',', '').replace('The', '')

                show = re.sub(r"\([^)]*\)", '', show).strip()

                show_detail = self.g.get_show_by_title(show)

                print(show_detail)

                if show_detail['total_results'] != 0:

                    for i in show_detail['results']:

                        self.logger.debug('new show {}'.format(show))

                        try:
                            c_tuple = Content.objects.get_or_create(guidebox_id=i['id'])

                            content = c_tuple[0]

                            content = self.g.save_content(i)

                            # content.title = i['title']
                            # content.guidebox_id = i['id']
                            # content.imdb_id = i['imdb_id']
                            # content.freebase_id = i['freebase']
                            # content.tvdb_id = i['tvdb']
                            # content.tvrage_id = i['tvrage']['tvrage_id']
                            # content.wikepedia_id = i['wikipedia_id']
                            # content.themoviedb_id = i['themoviedb']
                            # content.thumbnail_small = i['artwork_208x117']
                            # content.thumbnail_medium = i['artwork_304x171']
                            # content.thumbnail_large = i['artwork_448x252']
                            # content.thumbnail_x_large = i['artwork_608x342']
                            content.content_provider.add(p)

                            if not content.title:
                                self.logger.debug('blank show?')

                            content.save()
                            # self.logger()

                        except ValueError as e:
                            self.logger.debug(e)

            except:
                pass
