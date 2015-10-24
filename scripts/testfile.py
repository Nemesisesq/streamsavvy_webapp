from server.models import *

def run(*args, **kwargs):
    print(args[0])
    print(kwargs['hello'])
