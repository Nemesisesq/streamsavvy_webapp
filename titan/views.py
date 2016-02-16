# Create your views here.
import json

import requests
from bs4 import BeautifulSoup
from django.core.cache import cache
from django.http import JsonResponse
from django.views.generic import View

def guide_reciever(request):
    if cache.get('zip-code'):
            return JsonResponse(cache.get('zip-code'), safe=False)
    titan_page = request.body.decode('utf-8')
    t = TitanCrawler()
    soup = t.get_shows(titan_page)
    chans = t.process_soup(soup)

    cache.set('zip-code', chans)

    return JsonResponse(chans, safe=False)


class GuideTestView(View):
    def get(self, request):

        # TODO set up with real zipcode
        if cache.get('zip-code'):
            return JsonResponse(cache.get('zip-code'), safe=False)

        return JsonResponse('', safe=False)


def html_to_dict(i):
    try:

        return {
            'show': i.find(class_='ctt').text,
            'desc': i.find(class_='cdt').text
        }
    except:

        return None


class TitanCrawler(object):
    def get_request(self):
        url = 'http://titantv.com/default.aspx'
        response = requests.get(url)
        return response.content

    def get_shows(self, html):
        soup = BeautifulSoup(html)
        channel_list = soup.find_all('tr', class_='gridRow')

        return channel_list

    def process_soup(self, channel_list):

        list_of_rows = []
        for row in channel_list:
            cells = row.find_all('td')
            try:
                row_dict = {}

                row_dict['callsign'] = cells[0].find(class_='gridCallSignText').text,
                row_dict['network'] = cells[0].find(class_='gridNetworkText').text,
                row_dict['channel'] = cells[1].text,
                row_dict['shows'] = [html_to_dict(i) for i in cells[2:]]

                list_of_rows.append(row_dict)
            except Exception as e:
                print(e)

        return list_of_rows

    def run(self):
        req = self.get_request()
        channel_list = self.get_shows(req)
        dirty_guide = self.process_soup(channel_list)
        return dirty_guide
