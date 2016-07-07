import django

from server.tasks import connect_content_channel_task


django.setup()

def run():
    print
    connect_content_channel_task()
    print('im running ')



