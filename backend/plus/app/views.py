from django.shortcuts import render

# Create your views here.
<<<<<<< HEAD

def index(request):
    return render(request, 'index.html')
=======
def post(request):
	return JsonResponse( {'posts' : Post.objects.all() })
>>>>>>> 851b027cd2db45568ad362d8b792fcfc864a8e15
