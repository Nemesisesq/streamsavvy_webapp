import sys
from server.models import *

import time

def run(*args, **kwargs):
    print(args[0])
    sys.stdout.write(args[1])
    sys.stdout.flush()


def count():
    for i in range(100):
        time.sleep(1)
        print(i)

