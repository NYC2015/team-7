from django.shortcuts import render
from django.http import JsonResponse
from models import *

# Create your views here.
def community(request):
	return JsonResponse( {'community' : Community.objects.all() })