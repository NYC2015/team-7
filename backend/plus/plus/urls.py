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
from app.plus_twilio import *

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^posts$', posts),
    url(r'^login', login),
    url(r'^send', send_message),
    url(r'^receive', receive_message),
    url(r'^upboat', upboat),
    url(r'^flag', flag),
    url(r'^post', post),
    url(r'^comment', comment),
    url(r'^leaders', leaders),
    url(r'^register', register),
    url(r'^profile', profile),
    url(r'^update_anonymity', update_anonymity),
    url(r'^update_diseases', update_diseases),
    url(r'^update_reveal_to_others', update_reveal_to_others),
    url(r'^update_password', update_password),
    url(r'^update_name', update_name),
    url(r'^update_pseudonym', update_pseudonym),
    url(r'^update_current_phone_number', update_current_phone_number)
   ]
