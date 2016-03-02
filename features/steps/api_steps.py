from copy import deepcopy

from behave import given, when, then, step
############################
## Helpers
############################

############################
## GIVEN
############################
from django.db.models import Q
from fuzzywuzzy import fuzz

from server.apis.netflixable import Netflixable
from server.models import Channel, Content


# @given(u'a search request for {query}')
# def set_request_for_search(context, query):
#     factory = APIRequestFactory()
#     context.request = factory.get('/search/?q={q}'.format(q=query))
#     context.request.


############################
## WHEN
############################

@when(u'we search queryset for {query}')
def search_for_term(context, query):
    res = context.rest_client.get('/api/search/?q={q}'.format(q=query))
    assert res.status_code is 200
    context.response = res


@when(u'we get channel {source}')
def test_find_channel(context, source):
    context.channel = Channel.objects.get(source='source')


############################
## THEN
############################
@given("an unauthenticated user")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    pass


@then(u'we get a list')
def test_for_list(context):
    assert isinstance(context.response.data['results'], list)


@then(u'we see that it can be viewed by sling')
def test_check_for_sling(context):
    assert context.channel.is_on_sling


@when("we make a get request {url}")
def test_get_request_api_package(context, url):
    response = context.rest_client.get(url)
    assert response.status_code is 200
    context.response = response


@then("we get a blank package")
def test_for_blank_package(context):
    context.data = context.response.data['results'][0]['data']
    context.p_url = context.response.data['results'][0]['url']
    res = context.rest_client.get(context.response.data['results'][0]['url'])
    context.package = res.data
    assert context.data is not None
    assert context.data == {'content': '', 'hardware': '', 'services': ''}


@step("we modify the package")
def test_modify_package(context):
    package = context.package
    context.old_package = deepcopy(package)
    package['data']['content'] = 'hello, world!'
    package['data']['hardware'] = 'hello, nurse!'
    package['data']['services'] = 'hello, dolly!'
    context.url = package['url']
    # context.user = User.objects.get(id=package['url'].split('/')[:-1])
    context.package = package


@when("we make a post request {url}")
def test_post_request_api_package(context, url):
    # context.rest_client = APIClient()
    # context.rest_client.force_authenticate(context.user)
    response = context.rest_client.put(context.url, context.package, format='json')
    assert response.status_code == 200


@then("we update the package")
def check_the_package_has_changed(context):
    res = context.rest_client.get(context.p_url)
    assert context.old_package is not res.data


@when("we get a authtoken")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    pass


@given("and instance of Netflixable with {url}")
def test_get_instance_of_netflixable(context, url):
    context.n_flix = Netflixable(url)


@when("We make call the netflixable url")
def test_netflixable_get_list(context):
    context.n_flix.get_netflix_list()


@step("we make soup out of those shows")
def test_get_shows_from_soup(context):
    context.shows = context.n_flix.get_shows_from_soup()


@step("we find the show {show} in the soup")
def test_find_show_in_soup(context, show):
    netflixable_show = [dict for dict in context.shows if fuzz.token_sort_ratio(show, dict['show']) > 80]
    context.sample_show = netflixable_show[-1]
    assert netflixable_show


@when("we call the specific page for the show")
def step_impl(context):
    res = context.n_flix.get_netflixable_show_detail(context.sample_show['link'])
    title = res.find('h3', class_='post-title').string
    context.title = title

    assert title


@step("we check the database for the show and add netflix")
def step_impl(context):
    try:
        context.n_flix.save_found_show(context.title)
        context.found_show = True
    except:
        context.found_show = False


@step("we do a search by show title on guidebox if the show isn't int the database")
def test_search_show_by_title(context):
    if not context.found_show:
        context.fuzzy_show_list = context.guidebox.get_show_by_title(context.title)
        assert context.fuzzy_show_list
    else:
        assert True


@then("we save that show and add netflix")
def step_impl(context):
    if not context.found_show:
        context.guidebox.save_content(context.fuzzy_show_list['results'][0])


@then("{show} has the netflix channel")
def test_show_for_netflix_in_channel(context, show):
    orange = Content.objects.get(title__iexact=show)
    assert orange.guidebox_data


@step("we get a list of shows")
def step_impl(context):
    context.popular_netflix_shows = ['The Walking Dead', 'Attack on Titan', 'The Flash', 'House of Cards',
                                     'Supernatural', 'Doctor Who']
    context.n_flix.get_netflix_list()
    show_list = context.n_flix.get_shows_from_soup()

    def do_fuzzy_search_on_list(dict):

        for i in context.popular_netflix_shows:
            if fuzz.token_set_ratio(dict['show'], i) > 99:
                return True
        return False

    context.sample_show_list = [dict for dict in show_list if do_fuzzy_search_on_list(dict)]


@when("we call process shows")
def step_impl(context):
    context.n_flix.process_shows(context.sample_show_list)


@then("we see shows on netflix")
def step_impl(context):
    query = ''
    for i in context.popular_netflix_shows:
        q = Q(title__iexact=i)

        if query:
            query = query | q

        else:
            query  = q

    shows = Content.objects.filter(query)

    for show in shows:
        assert show.on_netflix

