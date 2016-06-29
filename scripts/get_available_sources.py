import django

from server.tasks import add_available_sources_to_shows


django.setup()

def run():
    print('hello')

    add_available_sources_to_shows()



