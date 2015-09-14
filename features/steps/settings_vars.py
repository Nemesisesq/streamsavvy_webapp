__author__ = 'Nem'
import os

from behave import *
import yaml


BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

############################
## GIVEN
############################

@given(u'a yaml file')
def open_yaml_file_test(context):
    context.file = open(os.path.join(BASE_DIR , "settings_vars.yaml"), 'r')


############################
## WHEN
############################

@when(u'it is loaded')
def load_yaml_test(context):
    context.yaml_contents = yaml.load(context.file)


############################
## THEN
############################

@then(u'it gives expected variables')
def check_settings_environment_variables_test(context):
    assert context.yaml_contents == {'settings': {"key": "hello", "secret": "world"}}


