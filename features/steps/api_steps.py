from copy import deepcopy

from behave import given, when, then, step
############################
## Helpers
############################

############################
## GIVEN
############################
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


@step("we process that list")
def test_process_netflixable_shows(context):
    context.n_flix.process_shows(context.shows)


@then("{show} has the netflix channel")
def test_show_for_netflix_in_channel(context, show):
    orange = Content.object.get(title__iexact = show)
    assert orange.guidebox_data