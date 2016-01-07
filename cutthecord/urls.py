"""cutthecord URL Configuration

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

from server.auth import *
from server.feedback import FeedbackView
from server.views import *

router = routers.DefaultRouter()
# router.register(r'users', UserViewSet)
# router.register(r'groups', GroupViewSet)
router.register(r'hardware', HardwareViewSet)
router.register(r'providers', ContentProviderViewSet)
router.register(r'content', ContentViewSet)
router.register(r'search', ContentSearchViewSet, 'search')
router.register(r'packageobj', PackageDetailViewSet, 'packageobj')
router.register(r'package', PackagesViewSet, 'package')
router.register(r'popular-shows', PopularShowsViewSet, 'popular_shows')

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^login/', login_view, name='server.auth.login'),
    # url(r'^search/', content_search, name='search'),
    url(r'^register/', register_user, name='register'),
    url(r'^channels/([0-9]{1,10})', ShowChannelsView.as_view(), name='show_channels'),
    url(r'^django_auth/', include('django.contrib.auth.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^social', include('social.apps.django_app.urls', namespace='social')),
    url(r'^django-rq', include('django_rq.urls')),
    url(r'^json-package/', JsonPackageView.as_view(), name='json_package'),
    url(r'^netflixable/', NetFlixListView.as_view(), name='netflixable'),
    url(r'^feedback/', FeedbackView.as_view(), name='feedback'),
    url(r'^beta/', 'django.contrib.auth.views.login', {'redirect_field_name': '/'}),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}),
    # url(r'^script/netflixable', get_netflixable_shows )
    # url(r'^package/$', package_list),
    # url(r'^package/(?P<pk>[0-9]+)/$', package_detail),
    # url(r'^/static/partials/(?P<template>[-_\w]+/$)', PartialsView.as_view(), name='partials'),
    # url(r'^.*$', TemplateView.as_view(template_name='index.html'))

]
