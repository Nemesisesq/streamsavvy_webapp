from behave import given, when, then
from rest_framework.test import APIRequestFactory

############################
## Helpers
############################

############################
## GIVEN
############################
from server.views import ContentSearchViewSet


@given(u'a request for {query}')
def set_request_for_search(context, query):
    factory = APIRequestFactory()
    context.request = factory.get('/search/?q={q}'.format(q=query))




############################
## WHEN
############################

@when(u'we search queryset for {query}')
def search_for_term(context, query):
    search_set = ContentSearchViewSet()
    search_set.request = context.request

    context.query_result=search_set.get_queryset()










############################
## THEN
############################
@then(u'we get a list')
def test_for_list(context):
    assert type(context.query_result) == list


