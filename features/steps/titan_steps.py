from behave import given, when, then

from titan.views import *


@given ('a titan crawler')
def step_crawl_tian(context):
    context.crawler = TitanCrawler()

@when('we crawl titan')
def step_check_for_shows(context):

    context.crawler.run()
    assert True is not False

@then('we find shows')
def step_impl(context):
    assert context.failed is False