from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
	user = models.OneToOneField(User)
	is_anonymous = models.BooleanField(default=True)
	DISEASE_CHOICES = (
		(0, 'Victor'),
		(1, 'HIV'),
		(2, 'AIDS'),
		(3, 'None')
	)
	reveal_to_others = models.BooleanField(default=False)
	diseases = models.IntegerField(choices = DISEASE_CHOICES)
	name = models.CharField(max_length = 100, blank = True)
	pseudonym = models.CharField(max_length = 100, blank = True)
	reputation = models.IntegerField(default = 0)
	current_phone_number = models.CharField(max_length = 12)

class Chat(models.Model):
	users = models.ManyToManyField(User, 'the chat participants')

class Message(models.Model):
	chat = models.ForeignKey(Chat)
	sender = models.ForeignKey(Profile)
	content = models.TextField()

class Post(models.Model):
	author = models.ForeignKey(Profile)
	upvotes = models.IntegerField(default = 0)
	flags = models.IntegerField(default = 0)
	title = models.TextField()
	content = models.TextField()
	date_created = models.DateField()

class Comment(models.Model):
    content = models.TextField()
    post = models.ForeignKey(Post, default = 0)
    # extra time upvotes
    author = models.ForeignKey(Profile)
