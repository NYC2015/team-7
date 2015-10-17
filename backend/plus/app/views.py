from django.shortcuts import render
<<<<<<< HEAD
from django.http import JsonResponse
from forms import ProfileForm
from django.core.contest_processors import csrf
from django.http import HttpResponseRedirect
from models import *
=======
>>>>>>> 5b0c3fcc273514c1d18b195c0fd7114947b4b876

# Create your views here.
<<<<<<< HEAD

def index(request):
    return render(request, 'index.html')
=======
def post(request):
<<<<<<< HEAD
	return JsonResponse( {'post' : Post.objects.all() })

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
				

=======
	return JsonResponse( {'posts' : Post.objects.all() })
>>>>>>> 851b027cd2db45568ad362d8b792fcfc864a8e15
>>>>>>> 5b0c3fcc273514c1d18b195c0fd7114947b4b876
