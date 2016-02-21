import json

import django_rq
from behave import given, when, then
# import json
from server.tasks import inital_database_population_of_content

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


############################
## THEN
############################

@then(u'json is returned')
def test_check_json(context):
    assert context.the_json


@then(u'we save the content')
def test_save_content(context):
    # TODO write test to check for saved content in the database
    sample_show = json.loads(context.the_json)[0]

    context.guidebox.save_content('')
    assert False


@then(u'there are a total number of shows in the queue')
def test_total_number_of_jobs_queued(context):
    q = django_rq.get_queue('low')
    assert len(q.jobs) > 0
