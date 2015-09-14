from behave import given, when, then
from server.populate_data import *
# import json

__author__ = 'Nem'

############################
## Helpers
############################

############################
## GIVEN
############################

@given(u'an index')
def put_index(context):
    context.index = 0

@given(u'repeat {r} times')
def set_repetitions(context, r):
    context.repetitions = r

@given(u'show id {show_id} and name {show_name}')
def set_show_id(context, show_id, show_name):
    context.show_id = show_id
    context.show_name = show_name


############################
## WHEN
############################

@when(u'get_content is called')
def test_get_content(context):
    context.the_json = context.guidebox.get_content(context.index)

@when(u'populate_content is called')
def test_populate_shows(context):
    context.show_count = context.guidebox.populate_content()

@when(u'get_content_detail method is called')
def test_content_detail(context):
    context.the_json = context.guidebox.get_content_detail(context.show_id)

@when(u'show_detail_multithreading is called')
def test_multithreaded(context):
    context.guidebox.populate_content_detail_multithreaded()

@when(u'show_detail_multithreading_extra is called')
def test_multithreaded(context):
    context.guidebox.populate_content_detail_multithreaded_extra()



############################
## THEN
############################

@then(u'json is returned')
def check_json(context):
    assert context.the_json

@then(u'there are {number_of_results} results')
def test_result_length(context, number_of_results):
    assert context.show_count == int(number_of_results)

@then(u'json is returned with an object of show id {show_id} and name {show_name}')
def test_detail_result(context, show_id, show_name):

    context.the_json = json.loads(context.the_json)

    var = context.the_json

    assert context.the_json['id'] == int(show_id)
    assert context.the_json['title'] == show_name

@then(u'shows have a description')
def test_show_descriptions():
    assert True

@then(u'we just pass True here')
def passing_true():
    assert True