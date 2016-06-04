from behave import *

from netflix_checker.tasks import run_initial_netflix_population

use_step_matcher("re")


@given("run inital netflix check")
def step_impl(context):
    run_initial_netflix_population()
    pass