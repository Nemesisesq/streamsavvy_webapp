from django.test import TestCase
import behave
from titan.models import Channel


# Create your tests here.


class ShowTestCase(TestCase):
    def setUp(self):
        Channel.objects.create(name='A&E', platform='SlingTV')

    def test_channel(self):
        c = Channel.objects.get(name='A&E')
        self.assertEqual(c.name, 'A&E')
