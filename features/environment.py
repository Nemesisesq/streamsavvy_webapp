import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'streamsavvy_webapp.settings'

# Even though the environment variable is set, this still may be
# necessary. Or may be CYA insurance

import django

django.setup()

from server.apis.guidebox import GuideBox
from splinter.browser import Browser
from django.test import Client



def before_tag(context, tag):
    if tag == 'rest':
        context.rest_client = Client()
    if tag == 'browser':
        context.browser = Browser()


def before_all(context):
    #### Take a test runner hostage ###
    from django.test.runner import DiscoverRunner

    context.runner = DiscoverRunner()


def before_feature(context, feature):
    if 'guidebox' in feature.tags:
        context.guidebox = GuideBox()


# def before_scenario(context, scenario):
#     context.runner.setup_test_environment()
#
#     context.old_db_config = context.runner.setup_databases()
#
# def after_scenario(context, scenario):
#     context.runner.teardown_databases(context.old_db_config)
#
#     context.runner.teardown_test_environment()

def after_tag(context, tag):
    if tag == 'browser':
        context.browser.quit()
        context.browser = None
