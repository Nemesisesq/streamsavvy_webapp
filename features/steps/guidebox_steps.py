import json

import django_rq
from behave import given, when, then
# import json
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


