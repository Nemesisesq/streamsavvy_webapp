from behave import given, when, then

############################
## Helpers
############################

############################
## GIVEN
############################
@given(u'an index of {index}')
def test_add_index_to_context(context, index):
    context.index = index




############################
## WHEN
############################


@when(u'we call the populate shows task')
def test_initial_population_of_shows(context):
    result = inital_database_population_of_content()
    assert result




############################
## THEN
############################

@then(u'json is returned')
def test_check_json(context):
    assert context.the_json
