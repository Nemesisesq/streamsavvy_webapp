import json

from behave import *
import time


from server.models import Package, Content, AnonymousUser


__author__ = 'Nem'



######################
## HELPERS
#####################


############################
## GIVEN
############################
@given(u'an anonymous user')
def create_anonymous_user(context):
    u = AnonymousUser(username=str(time.time()))
    u.save()
    context.user = u



############################
## WHEN
############################

@when(u'we have a new package')
def create_new_package(context):
    context.package = Package()




############################
## THEN
############################
@then(u'we can assign the anonymous user as the packages owner')
def test_adding_annonymous_user_to_package(context):
    context.package.owner = context.user

    assert context.user == context.package.owner
    context.user.delete()

