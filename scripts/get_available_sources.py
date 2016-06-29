import django

from server.tasks import add_available_sources_to_shows


django.setup()

def run():

    add_available_sources_to_shows()



