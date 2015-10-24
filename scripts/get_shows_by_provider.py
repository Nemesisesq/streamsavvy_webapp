__author__ = 'Nem'
import django

from server.populate_data.guidebox import *
from server.populate_data.netflixable import *

django.setup()

def run():
    # get shows by source
    get_shows_by_source()


