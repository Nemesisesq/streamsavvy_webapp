import json

from braces.views import CsrfExemptMixin
from django.db import models
from django.http import JsonResponse
from django.views.generic import View


# model for saving feed back
class Feedback(models.Model):
    browser = models.CharField(max_length=150, blank=True, null=True)
    url = models.CharField(max_length=150, blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    image = models.ImageField()
    html = models.TextField(blank=True, null=True)


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

        feedback = Feedback(the_json['browser'], the_json['url'], the_json['note'], the_json['img'], the_json['html'])

        if feedback.save():
            return JsonResponse('data', safe=False)
        else:
            return JsonResponse('something went wrong', safe=False)

# @csrf_exempt
# def feedback(request):
#     re = request
#     return JsonResponse('data', safe=False)
