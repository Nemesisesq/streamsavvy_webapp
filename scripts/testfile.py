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

def writetest():
    with open('mytextfile.txt', 'wb+') as f:
        time.sleep(300)
        f.write('hello world')
        f.close()
