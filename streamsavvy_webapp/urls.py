"""streamsavvy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""

from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from guide.views import RoviChannelGridView
from server.auth import *
from server.feedback import FeedbackView
from server.views import *

# from titan.views import GuideTestView, guide_reciever

router = routers.DefaultRouter()
router.register(r'hardware', HardwareViewSet)
router.register(r'services', ChannelViewSet)
router.register(r'content', ContentViewSet)
router.register(r'package', PackagesViewSet, 'package')
router.register(r'popular-shows', PopularShowsViewSet, 'popular_shows')
router.register(r'users', UserViewSet, 'user')
# router.register(r'groups', GroupViewSet)
# router.register(r'search', ContentSearchViewSet, 'search')
# router.register(r'packageobj', PackageDetailViewSet, 'packageobj')

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^login/', login_view, name='server.auth.login'),
    url(r'^register/', register_user, name='register'),
    url(r'^django_auth/', include('django.contrib.auth.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^social/', include('social.apps.django_app.urls', namespace='social')),
    url(r'^django-rq', include('django_rq.urls')),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}),
    url(r'^api/guide/(?P<zip>\d{5})', RoviChannelGridView.as_view(), name='rovi_channel_grid_view'),
    url(r'^api/search', call_search_microservice, name='search'),
    url(r'^node-data/(?P<path>\w+)', get_service_list, name='service_list'),
    url(r'^service_description/(?P<service>\w+)', get_service_description, name='service_description'),
    url(r'^viewing_windows/(?P<service>\w+)', get_viewing_windows, name='viewing_windows'),
    url(r'^sign_up/$', SignUp.as_view(), name="sign_up"),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]
