import django

from server.tasks import inital_database_population_of_content


django.setup()

def run():

    inital_database_population_of_content()



