from django.shortcuts import render

from django.http import JsonResponse
from forms import ProfileForm
from django.core.context_processors import csrf
from django.contrib.auth import authenticate, login as django_login
from django.http import HttpResponseRedirect
from models import *
import datetime

# Create your views here.
def posts(request):
    posts = filter(lambda x: x.flags < 5, Post.objects.all())
    posts = sorted(posts, key=lambda x: x.upvotes, reverse=True)
    for post in posts:
        post.date_created = json.dump(instance.date_produced.strftime('%Y-%m-%dT%H:%M:%S'))
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
   users = Profile.objects.all()
   leaders = sorted(Profile.objects.all(), key=lambda x: x.reputation)[:30]
   return JsonResponse({'leaders':leaders})

# Make a comment
def comment(request):
   content = request.POST['content']
   author_id = request.POST['author']
   post_id = request.POST['post_id']
   author = Profile.objects.get(id=author_id)
   c = Comment(author=author, content=content, post=post_id)
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
				'user' : user.username,
				'user_id': profile.id,
				'phone_number': profile.current_phone_number,
				'disease': profile.diseases
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
