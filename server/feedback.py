import json

from braces.views import CsrfExemptMixin
from django.http import JsonResponse
from django.views.generic import View
from django.db import models

#model for saving feed back
class Feedback(models.Model):

    browser = models.CharField(max_length=200, blank=True, null=True)
    url     = models.URLField()
    note    = models.TextField()
    img     = models.ImageField()
    html    = models.TextField()

    pass


class FeedbackView(CsrfExemptMixin, View):
    #
    # @csrf_exempt
    # def dispatch(self, request, *args, **kwargs):
    #     return super(FeedbackView, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        import codecs

        reader = codecs.getreader("utf-8")

        re = request.REQUEST['feedback']
        # req = request.body.decode('utf-8')
        # s = re.decode('utf-8')

        the_json = json.loads(re)

        x = 'hello world'
        return JsonResponse('data', safe=False)

# @csrf_exempt
# def feedback(request):
#     re = request
#     return JsonResponse('data', safe=False)
