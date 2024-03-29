from django.shortcuts import render

from django.http import JsonResponse
from django.core.context_processors import csrf
from django.core import serializers
from django.contrib.auth import authenticate, login as django_login
from django.http import HttpResponseRedirect
import json
from models import *
import datetime

from django.core import serializers

def obj_to_dict(model_instance):
    serial_obj = serializers.serialize('json', [model_instance])
    obj_as_dict = json.loads(serial_obj)[0]['fields']
    obj_as_dict['id'] = model_instance.pk
    return obj_as_dict

# Create your views here.
def posts(request):
    posts = Post.objects.filter(flags__lt = 5).order_by('upvotes')[::-1]
    posts = map(obj_to_dict, posts)
    for post in posts:
        post['comments'] = map(obj_to_dict, Comment.objects.filter(post=post['id']))

    return JsonResponse({'posts':posts})

# Make a post
def post(request):
   content = request.POST['content'] 
   author_id = request.POST['author']
   author = Profile.objects.get(id=author_id)
   title = request.POST['title'] 
   date_created = datetime.date.today()
   p = Post(author=author,
            content=content,
            title=title,
            date_created=date_created)
   p.save()
   return JsonResponse({'post_id':p.id})

def leaders(request):
   leaders = map(obj_to_dict, Profile.objects.all().order_by('reputation'))
   return JsonResponse( {'leaders' : leaders[:30]} )

# Make a comment
def comment(request):
    content = request.POST['content']
    author_id = request.POST['author']
    post_id = request.POST['post_id']
    post = Post.objects.get(id=post_id)
    author = Profile.objects.get(id=author_id)
    c = Comment(author=author, content=content, post=post)
    c.save()

    author.reputation += 1
    author.save()

    return JsonResponse({'comment_id':c.id})

def register(request):
    username = request.POST['username']
    phone_number = request.POST['phone_number']
    password = request.POST['password']
    disease = int(request.POST['disease'])
    user = User.objects.create_user(username, password=password)
    profile = Profile(user=user, current_phone_number=phone_number, diseases=disease)
    profile.save()
    return JsonResponse({
        'user': user.username,
        'phone_number': profile.current_phone_number,
        'disease': profile.diseases
        })
    

def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user:
        django_login(request, user)
        profile = Profile.objects.get(user=user)
        return JsonResponse({
        		'profile' : obj_to_dict(profile)
            })
    else:
        return JsonResponse({ 'message': 'Incorrect username or password' })

def index(request):
    return render(request, 'index.html')

def upboat(request):
    post_id = request.POST['post_id']
    post = Post.objects.get(id= post_id)
    post.upvotes += 1
    post.save()

    author = post.author
    author.reputation += 1
    author.save()

    return JsonResponse( {'message' : 'upboated'} )

def flag(request):
    post_id = request.POST['post_id']
    post = Post.objects.get(id= post_id)
    post.flags += 1
    post.save()
    return JsonResponse({'message' : 'flagged'})

def profile(request):
	username = request.POST['username']
	user = User.objects.get(username=username)
	profile = Profile.objects.get(user=user)
	return JsonResponse({
			'profile': obj_to_dict(profile)
		})

def update_anonymity(request):
	username = request.POST['username']
	is_anonymous = request.POST['is_anonymous'].lower() == 'true'
	user = User.objects.get(username=username)
	profile = Profile.objects.get(user=user)
	profile.is_anonymous = is_anonymous
	profile.save()
	return JsonResponse({
			'username': user.username,
			'is_anonymous': profile.is_anonymous,
		})

def update_diseases(request):
	username = request.POST['username']
	diseases = int(request.POST['diseases'])
	user = User.objects.get(username=username)
	profile = Profile.objects.get(user=user)
	profile.diseases = diseases
	profile.save()
	return JsonResponse({
			'username': user.username,
			'diseases': profile.diseases,
		})

def update_reveal_to_others(request):
	username = request.POST['username']
	reveal_to_others = request.POST['reveal_to_others'].lower() == 'true'
	user = User.objects.get(username=username)
	profile = Profile.objects.get(user=user)
	profile.reveal_to_others = reveal_to_others
	profile.save()
	return JsonResponse({
			'username': user.username,
			'reveal_to_others': profile.reveal_to_others,
		})

def update_password(request):
	username = request.POST['username']
	password = request.POST['password']
	user = User.objects.get(username=username)
	user.set_password(password)
	user.save()
	return JsonResponse({
			'username': user.username
		})

def update_name(request):
	username = request.POST['username']
	name = request.POST['name']
	user = User.objects.get(username=username)
	profile = Profile.objects.get(user=user)
	profile.name = name
	profile.save()
	return JsonResponse({
			'username': user.username,
			'name': profile.name,
		})

def update_pseudonym(request):
	username = request.POST['username']
	pseudonym = request.POST['pseudonym']
	user = User.objects.get(username=username)
	profile = Profile.objects.get(user=user)
	profile.pseudonym = pseudonym
	profile.save()
	return JsonResponse({
			'username': user.username,
			'pseudonym': profile.pseudonym,
		})

def update_current_phone_number(request):
	username = request.POST['username']
	current_phone_number = request.POST['current_phone_number']
	user = User.objects.get(username=username)
	profile = Profile.objects.get(user=user)
	profile.current_phone_number = current_phone_number
	profile.save()
	return JsonResponse({
			'username': user.username,
			'current_phone_number': profile.current_phone_number,
		})
