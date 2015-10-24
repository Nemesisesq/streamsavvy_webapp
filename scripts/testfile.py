import sys
from server.models import *

def run(*args, **kwargs):
    print(args[0])
    sys.stdout.write(args[1])
    sys.stdout.flush()

