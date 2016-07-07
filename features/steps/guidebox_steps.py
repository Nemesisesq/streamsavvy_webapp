import json

import django_rq
from behave import given, when, then, step
# import json

from server.models import Content, Channel
from server.tasks import inital_database_population_of_content, inital_database_population_of_channels, \
    connect_content_channel_task, add_available_sources_to_shows, add_detail_to_shows

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
    context.total_channels = context.guidebox.get_total_number_of_channels()
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


@given("a list of channels from the database")
def step_impl(context):
    context.sample_channels = Channel.objects.all()[:2]


@when("we process that list")
def step_impl(context):
    context.guidebox.connect_channels_shows(context.sample_channels)


@then("the content now has channels")
def step_impl(context):
    for elem in context.sample_channels:
        c = Content.objects.filter(channel__id=elem.id)
        if c:
            assert len(c[0].channel.all()) > 0


@when("we call the connect channel to content task")
def step_impl(context):
    connect_content_channel_task()


@then("there are a total number of jobs in the {level} queue")
def step_impl(context, level):
    q = django_rq.get_queue(level)
    assert len(q.jobs) > 0


@given("a show Orange is the new black")
def step_impl(context):
    context.show = Content.objects.get(title__iexact='Orange is the new black')
    assert context.show


@when("we add available content to the show")
def step_impl(context):
    context.guidebox.add_additional_channels_for_show(context.show)


@then("the show now has sources")
def step_impl(context):
    assert context.show.guidebox_data['sources']


@when("we call the add available content task")
def step_impl(context):
    add_available_sources_to_shows()


@given("the show {show}")
def step_impl(context, show):
    context.sample_show = Content.objects.get(title__iexact=show)
    assert context.sample_show


@when("we call guidebox for detail about the show")
def step_impl(context):
    context.the_detail = context.guidebox.get_content_detail(context.sample_show.guidebox_data['id'])
    assert context.the_detail


@step("we save the show")
def step_impl(context):
    assert context.guidebox.save_content_detail(context.the_detail)


@then("{show} has details")
def step_impl(context, show):
    obj = Content.objects.get(title__iexact=show)
    assert obj.guidebox_data['detail']


@given("we call the the add details task")
def step_impl(context):
    add_detail_to_shows()


@given("a the show Game of Thrones")
def step_impl(context):
    context.show = Content.objects.get(title='Game of Thrones')


@when("We call sling over the air processor")
def step_impl(context):
    context.guidebox.process_content_for_sling_ota_banned_channels(context.show)
    """
    :type context: behave.runner.Context
    """


@then("Xfinity is removed")
def step_impl(context):
    show_list = [i for i in context.show.guidebox_data['sources']['web']['episodes']['all_sources'] if
                 i['display_name'] == 'Xfinity']

    assert len(show_list) == 0
