import datetime
from haystack import indexes
from server.models import Content

class ContentIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
