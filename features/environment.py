import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'cutthecord.settings'

from server.populate_data.guidebox import GuideBox

def before_all(context):
    # Even though the environment variable is set, this still may be
    # necessary. Or may be CYA insurance

    import django
    django.setup()

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

