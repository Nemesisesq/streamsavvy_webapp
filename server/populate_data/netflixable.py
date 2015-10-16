import urllib.request
import urllib.error
import logging

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

        result = map(lambda x: x.string, shows)

        return list(result)

    def process_shows(self):

        shows = self.get_shows_from_soup()

        p = ContentProvider.objects.get_or_create(name='Netflix')[0]

        for show in shows:
            try:
                c_tuple = Content.objects.get_or_create(title__iexact=show)

                c = c_tuple[0]

                c.title = show

                show_detail = self.g.get_show_by_title(show)

                if show_detail['total_results'] != 0:

                    show_dict = show_detail['results'][0]

                    if c_tuple[1]:

                        self.logger.debug('new show {}'.format(show))

                        try:



                            c.content_provider.add(p)
                            c.guidebox_id = show_dict['id']
                            c.thumbnail_small = show_dict['artwork_208x117']
                            c.thumbnail_medium = show_dict['artwork_304x171']
                            c.thumbnail_large = show_dict['artwork_448x252']
                            c.thumbnail_x_large = show_dict['artwork_608x342']

                            c.save()

                        except ValueError as e:
                            self.logger.debug(e)




                    else:
                        c = c_tuple[0]
                        if c.guidebox_id == show_dict['id']:
                            self.logger.debug('show {} was updated'.format(show))
                            c.content_provider.add(p)
                            c.thumbnail_small = show_dict['artwork_208x117']
                            c.thumbnail_medium = show_dict['artwork_304x171']
                            c.thumbnail_large = show_dict['artwork_448x252']
                            c.thumbnail_x_large = show_dict['artwork_608x342']

                            c.save()
            except:
                pass
