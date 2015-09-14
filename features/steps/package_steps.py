import json

from behave import *
from django.contrib.auth.models import User

from server.models import Package, Content


__author__ = 'Nem'



######################
## HELPERS
#####################
def email_for_username(username):
    return "%s@ctc.com" % username

def post_ajax_request(client, url, data):
    return client.post(url, json.dumps(data),
        HTTP_X_REQUESTED_WITH='XMLHttpRequest',
        content_type="application/json"
    )

def get_ajax_request(client, url):
    return client.get(url,
        HTTP_X_REQUESTED_WITH='XMLHttpRequest',
        content_type="application/json"
    )

############################
## GIVEN
############################


@given(u'a user {username}')
def create_user(context, username):

    user = User.objects.get(username=username)
    package = Package.objects.get_or_create(owner=user)
    context.user = user
    context.package = package[0]

############################
## WHEN
############################


@when('content is added to its package')
def add_content_to_package(context):
    content = Content.objects.get_or_create(title='Arlsan Senki')
    try:
        context.package.content.remove(content[0])
    except:
        pass

    context.old_length = len(context.package.content.all())


    context.package.content.add(content[0])


############################
## THEN
############################

@then('its content list should increase')
def check_increase_in_content_list(context):
    assert context.old_length < len(context.package.content.all())

