import json
from behave import given, when, then
from server.apis.guidebox import *
# import json
from server.apis.netflixable import Netflixable
from scripts import get_netflixable_shows

__author__ = 'Nem'

############################
## Helpers
############################

############################
## GIVEN
############################
@given(u'an index of {index}')
def add_index_to_context(context, index):
    context.index = index



############################
## WHEN
############################

@when(u'a list of content is requested from guidebox')
def request_content_from_guidebox(context):
    shows = context.guidebox.get_content_list(context.index)
    context.the_json = shows
    assert type(shows) == str


############################
## THEN
############################

@then(u'json is returned')
def check_json(context):
    assert context.the_json

@then(u'we save the content list')
def save_content_list(context):
    assert False