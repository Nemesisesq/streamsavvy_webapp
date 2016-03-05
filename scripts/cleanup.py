from server.models import Content, Channel

__author__ = 'Nem'

import django_rq


q = django_rq.get_queue('low')

def clean_up_content():
    content = Content.objects.all(title='')
    for i in content:
        i.delete()


def clean_up_channels():
    content = Channel.objects.all(name='')
    for i in content:
        i.delete()

def run():
    #Cleanup Content
    q.enqueue(clean_up_content)
    q.enqueue(clean_up_channels)
