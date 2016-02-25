import json
from copy import deepcopy

import django_rq
from behave import given, when, then, step
# import json
from django.contrib.auth.models import User
from rest_framework.test import APIClient

from server.tasks import inital_database_population_of_content, inital_database_population_of_channels

__author__ = 'Nem'


############################
## Helpers
############################

############################
## GIVEN
############################
@given(u'an index of {index}')
def test_add_index_to_context(context, index):
    context.index = index


@given(u'a total number of shows')
def test_get_total_number_guidebox_shows(context):
    context.total_shows = context.guidebox.get_total_number_of_shows()
    assert type(context.total_shows) == int
    assert context.total_shows > 0


@given(u'a total number of channels')
def test_get_total_number_guidebox_shows(context):
    context.total_shows = context.guidebox.get_total_number_of_channels()
    assert type(context.total_channels) == int
    assert context.total_shows > 0


############################
## WHEN
############################

@when(u'a list of content is requested from guidebox')
def test_request_content_from_guidebox(context):
    shows = context.guidebox.get_content_list(context.index)
    context.the_json = shows
    assert type(shows) == str


@when(u'we call the populate shows task')
def test_initial_population_of_shows(context):
    result = inital_database_population_of_content()
    assert result


@when(u'we call the populate channel task')
def test_initial_population_of_channels(context):
    results = inital_database_population_of_channels()
    assert results


@when("a list of channels is requested from guidebox")
def test_request_channels_from_guidebox(context):
    channels = context.guidebox.get_channel_list('all', context.index)
    context.the_json = channels
    assert type(channels) == str

    """
    :type context: behave.runner.Context
    """
    pass


############################
## THEN
############################

@then(u'json is returned')
def test_check_json(context):
    assert context.the_json


@then(u'we save the content')
def test_save_content(context):
    # TODO write test to check for saved content in the database
    sample_show = json.loads(context.the_json)['results'][0]
    result = context.guidebox.save_content(sample_show)
    assert result


@then("we save the channels")
def test_save_channels(context):
    sample_channel = json.loads(context.the_json)['results'][0]
    result = context.guidebox.save_channel(sample_channel)
    assert result


@then(u'there are a total number of shows in the queue')
def test_total_number_of_jobs_queued(context):
    q = django_rq.get_queue('low')
    assert len(q.jobs) > 0


@then(u'there are a total number of channels in the queue')
def test_total_number_of_jobs_queued(context):
    q = django_rq.get_queue('low')
    assert len(q.jobs) > 0


@then(u'there are channels in the database')
def test_check_for_channels_in_db(context):
    q = django_rq.get_queue('low')
    assert len(q.jobs) > 0


@when("we make a get request {url}")
def test_get_request_api_package(context, url):
    response = context.rest_client.get(url)
    assert response.status_code == 200

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
def step_impl(context):
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


@given("an unauthenticated user")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    pass
