import json
import logging
import re
import time
import urllib

from bs4 import BeautifulSoup
from django.contrib.auth.models import Group
from django.core.cache import cache
from django.db.models import Q
from django.http import JsonResponse
from django.views.generic import View
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from server.models import *
from server.permissions import IsAdminOrReadOnly
from server.populate_data.guidebox import GuideBox
from server.populate_data.netflixable import Netflixable
from server.serializers import UserSerializer, GroupSerializer, HardwareSerializer, ContentProviderSerializer, \
    ContentSerializer, PackagesSerializer, PackageDetailSerializer


def flatten(l):
    out = []
    for item in l:
        if isinstance(item, (list, tuple)):
            out.extend(flatten(item))
        else:
            out.append(item)
    return out


class NetFlixListView(View):
    def get(self, request):

        n_show_list = cache.get('netflix_show_list')
        if n_show_list:
            return JsonResponse(n_show_list, safe=False)
        else:
            host = 'http://usa.netflixable.com'

            with urllib.request.urlopen(host) as response:
                soup = BeautifulSoup(response, 'html.parser')

            def alpha_list(href):
                return href and re.compile("alphabetical-list").search(href)

            ref_list = soup.find_all(href=alpha_list)

            url = host + ref_list[0].get('href')

            n = Netflixable(url)

            n_show_list = n.get_shows_from_soup()

            n_show_list = flatten(n_show_list)

            cache.set('netflix_show_list', n_show_list, timeout=24 * 60 * 60)

            return JsonResponse(n_show_list, safe=False)


class ShowChannelsView(View):
    def get(self, request, show_id):
        channel_key = "channel_set_{}".format(show_id)
        if cache.get(channel_key):
            channel_set = cache.get(channel_key)

            return JsonResponse(channel_set, safe=False)

        g = GuideBox()

        channel_set = json.loads(g.get_channels(show_id))

        cache.set(channel_key, channel_set)

        return JsonResponse(channel_set, safe=False)


class JsonPackageView(View):
    def get(self, request):

        self.logger = logging.getLogger('cutthecord')

        try:
            pkg = JsonPackage.objects.get_or_create(owner=request.user)[0].json
        except:
            pkg = ''
        if pkg != '': pkg = json.loads(pkg, encoding='utf-8')
        return JsonResponse(pkg, safe=False)

    def post(self, request):
        user_json_tuple = JsonPackage.objects.get_or_create(owner=request.user)
        user_json_package = user_json_tuple[0]

        try:

            user_json_package.json = request.body
            user_json_package.save()
            return JsonResponse({'hello': 'world'}, safe=False)

        except Exception as e:
            self.logger.debug(e)


# def json_package(request):
#     if request.method == 'POST':
#         user_json_tuple = JsonPackage.objects.get_or_create(owner=request.user)
#         user_json_package = user_json_tuple[0]
#
#         try:
#             user_json_package.json = str(request.body, encoding='utf-8')
#             user_json_package.save()
#             return JsonResponse({'hello': 'world'})
#
#         except:
#             pass
#     else:
#         return HttpResponseNotAllowed(['POST'])


class AdminPermMixin(object):
    permission_classes = (IsAdminOrReadOnly,)


class UserViewSet(IsAdminUser, viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class HardwareViewSet(viewsets.ModelViewSet):
    queryset = Hardware.objects.all()
    serializer_class = HardwareSerializer


class ContentProviderViewSet(viewsets.ModelViewSet):
    queryset = ContentProvider.objects.all()
    serializer_class = ContentProviderSerializer


class ContentSearchViewSet(viewsets.ModelViewSet):
    params = None
    # queryset = content_search()
    serializer_class = ContentSerializer

    def filter_by_content_provider(self, x):
        f = x.content_provider.filter(self.params)
        if len(f) > 0:
            return False
        else:
            return True

    def filter_by_guidebox_id(self, x):

        if x.guidebox_id not in [3084, 31168, 31150, 15935]:
            return True

        return False

    def filter_query(self, filtered_ids, entries):

        for i in filtered_ids:
            q = Q(guidebox_id=i)

            if self.params:
                self.params = self.params | q

            else:
                self.params = q

        return list(filter(self.filter_by_content_provider, entries))

    def list(self, request, *args, **kwargs):
        response = super(ContentSearchViewSet, self).list(request, args, kwargs)

        response.data['searchText'] = request.GET['q']

        return response

    def get_queryset(self):
        search_results = content_search(self.request)
        filter_results = self.filter_query([165], search_results)

        if len(filter_results) == 0:
            g = GuideBox()

            if ('q' in self.request.GET) and self.request.GET['q'].strip():
                query_string = self.request.GET['q']
                result = g.get_show_by_title(query_string)

                result = result['results']

                result_list = []

                for show in result:
                    result_list.append(g.save_content(show))

                filter_results = self.filter_query([165], result_list)

        # filter_results['search_term'] = self

        filter_results = list(filter(self.filter_by_guidebox_id, filter_results))

        return filter_results


class ContentViewSet(viewsets.ModelViewSet):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer


class PopularShowsViewSet(viewsets.ModelViewSet):
    # queryset = get_popular_shows()
    serializer_class = ContentSerializer

    def get_popular_shows(self):
        shows = ["Community",
                 "Comedians in Cars Getting Coffee",
                 "Transparent", "Happy Valley",
                 "House of Cards",
                 "Deadbeat",
                 "Bosch",
                 "The Mindy Project",
                 "Orange is the New Black"]
        q = None

        for show in shows:

            query = Q(title__iexact=show)

            if q is None:
                q = query

            else:
                q = q | query

        return q

    def get_queryset(self):
        return Content.objects.filter(self.get_popular_shows())


class PackageDetailViewSet(viewsets.ModelViewSet):
    serializer_class = PackageDetailSerializer

    logger = logging.getLogger('cuthecord')

    # permission_classes = (IsOwner,)

    def get_queryset(self):
        try:
            user = get_user(self)
            return get_packages(user)

        except Exception as e:
            self.logger.debug(e)


def get_user(self):
    if self.request.user.is_anonymous():
        if not self.request.session.get('has_session'):
            self.request.session['has_session'] = True
            self.request.session.save()
        try:
            user = AnonymousUser.objects.get(session=self.request.session.session_key)
        except:
            user = AnonymousUser(session=self.request.session.session_key)
            user.username = time.time()

        user.save()


    else:
        user = self.request.user

    return user


def get_packages(user):
    package = Package.objects.filter(owner=user)

    if not package:
        Package(owner=user).save()
        package = Package.objects.filter(owner=user)

    return package


class PackagesViewSet(viewsets.ModelViewSet):
    serializer_class = PackagesSerializer

    # permission_classes = (IsOwner,)

    def get_queryset(self):
        user = get_user(self)

        package = get_packages(user)

        return package


def normalize_query(query_string,
                    findterms=re.compile(r'"([^"]+)"|(\S+)').findall,
                    normspace=re.compile(r'\s{2,}').sub):
    ''' Splits the query string in invidual keywords, getting rid of unecessary spaces
        and grouping quoted words together.
        Example:

        >>> normalize_query('  some random  words "with   quotes  " and   spaces')
        ['some', 'random', 'words', 'with quotes', 'and', 'spaces']

    '''
    return [normspace(' ', (t[0] or t[1]).strip()) for t in findterms(query_string)]


def get_query(query_string, search_fields):
    ''' Returns a query, that is a combination of Q objects. That combination
        aims to search keywords within a model by testing the given search fields.

    '''
    query = None  # Query to search for every search term
    terms = normalize_query(query_string)
    for term in terms:
        or_query = None  # Query to search for a given term in each field
        for field_name in search_fields:
            q = Q(**{"%s__icontains" % field_name: term})
            if or_query is None:
                or_query = q
            else:
                or_query = or_query | q
        if query is None:
            query = or_query
        else:
            query = query & or_query
    return query


def content_search(request):
    query_string = ''
    found_entries = None
    if ('q' in request.GET) and request.GET['q'].strip():
        query_string = request.GET['q']

        if cache.get(query_string):
            return cache.get(query_string)

        entry_query = get_query(query_string, ['title'])

        found_entries = Content.objects.filter(entry_query)

        cache.set(query_string, found_entries)

        for entry in found_entries:
            pass

        # data = []
        # for i in found_entries:
        # data.append({
        # 'title': i.title,
        # 'description': i.description,
        #         'image': i.image_url,
        #         'home': i.home_url
        #     })

        # return JsonResponse(data, safe=False)
        return found_entries
