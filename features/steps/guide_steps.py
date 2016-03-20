from behave import *


@given(u'a zip_code')
def step_impl(context):
    for row in context.table:
        context.zip = row['zip']


        @when(u'we call the get method on RoviChannelGrid')
        def step_impl(context):
            context.res = context.rest_client.get('http://127.0.0.1:8000/api/guide/{zip}'.format(zip=context.zip))


        @then(u"we get a grid")
        def step_impl(context):
            assert context.res.status_code is 200
