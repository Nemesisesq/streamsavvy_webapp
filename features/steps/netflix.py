from behave import *

from netflix_checker.tasks import run_initial_netflix_population

use_step_matcher("re")


@given("run inital netflix check")
def step_impl(context):
    run_initial_netflix_population()
    pass


@given("the netflixable website url")
def step_impl(context):

    pass


@when("we get a response")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    pass


@then("we pull the update links")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    pass


@then("we save the links")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    pass