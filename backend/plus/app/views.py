from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from app.models import *

from django.http import JsonResponse
from forms import ProfileForm
from django.core.context_processors import csrf
from django.http import HttpResponseRedirect
from models import *

# Create your views here.
def posts(request):
	return JsonResponse( {'posts' : Post.objects.all() })

def add_user(request):
	username = request.POST['username']
	phone_number = request.POST['phone_number']
	password = request.POST['password']
	disease = int(request.POST['disease'])

	if User.objects.filter(username=username).exists():
		user = User.objects.get(username=username)
		profile = Profile.objects.get(user=user)
		return JsonResponse( {'user' : user.username, 'phone_number': profile.current_phone_number} )
	else:
		new_user = User.objects.create_user(username, password=password)
		profile = Profile(user=new_user, current_phone_number=phone_number, diseases=disease)
		profile.save()
		return JsonResponse( {'message' : 'added user'} )

def index(request):
    return render(request, 'index.html')

def userprofile(request):

		if request.method == 'POST':
				form = ProfileForm(request.POST, instance = request.user.profile)
				if form.is_valid():
						form.save()
						return HttpResponseRedirect('/account/loggedin')


				else:

						user = request.user
						profile = user.profile
						form = ProfileForm(instance = profile)


				args = {}
				args.update(csrf(request))
				args['userForm'] = form
				args['user'] = request.user
				return render_to_response('userprofile.html', args)
				
