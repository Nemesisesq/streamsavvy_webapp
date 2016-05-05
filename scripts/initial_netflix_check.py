import django

from netflix_checker.tasks import run_initial_netflix_population

django.setup()

def run():
    run_initial_netflix_population()

