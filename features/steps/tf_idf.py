from behave import *

from secret_sauce.tf_idf import ContentEngine

use_step_matcher("re")


@given("our content engine")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """

    context.c_e = ContentEngine()
    pass


@when("we train our content engine")
def step_impl(context):
    context.c_e.train()
    """
    :type context: behave.runner.Context
    """
    pass


@step("We make a prediction")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """

    print(context.c_e.predict(28164, 10))
    print(context.c_e.predict(2098, 10))
    print(context.c_e.predict(2814, 10))

    assert (True)
