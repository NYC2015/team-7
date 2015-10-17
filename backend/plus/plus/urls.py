"""plus URL Configuration

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
from django.conf.urls.static import static
from django.conf import settings
from app.views import *

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^posts$', posts),
    url(r'^get_user', get_user),
    url(r'^send', 'plus_twilio.send'),
    url(r'^receive', 'plus_twilio.receive'),
    url(r'^upboat', upboat),
    url(r'^flag', flag),
    # url(r'^$', 'django.contrib.staticfiles.views.serve', kwargs = {'path' : 'index.html', 'document_root' : settings.STATIC_ROOT}),
    # ] + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
    ]
    # url(r'^profile/user', )
    # url(r'', )
#    ] + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
