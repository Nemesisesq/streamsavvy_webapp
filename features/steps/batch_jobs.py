from behave import given, when, then

############################
## Helpers
############################

############################
## GIVEN
############################



############################
## WHEN
############################


@when(u'the guidebox date call is run')
def test_guidebox_api_date_call(context):

    result = context.guidebox.get_server_time()
    assert result


############################
## THEN
############################

@then(u'the streamsavvy db status is updated')
def test_streamsavvy_db_status(context):

    assert context.the_json
