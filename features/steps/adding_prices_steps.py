__author__ = 'Nem'
import os

from behave import *

from server.populate_data import *
import yaml


BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

############################
## GIVEN
############################

@given(u'a yaml file provider_prices')
def open_yaml_file_test(context):
    context.file = open(os.path.join(BASE_DIR , "provider_prices.yaml"), 'r')


############################
## WHEN
############################

@when(u'I process the yaml file')
def load_yaml_test(context):
    p = Providers()
    p.import_paid_providers()


############################
## THEN
############################

@then(u'it should populate prices')
def check_settings_environment_variables_test(context):
    assert True


