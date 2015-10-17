from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from app.models import *

# Create your views here.
def posts(request):
	return JsonResponse( {'posts' : Post.objects.all() })

def add_user(request):
	return JsonResponse( {'body': request.body} )
	# username = request.GET['username']
	# phone_number = request.GET['phone_number']
	# password = request.GET