from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
	user = models.OneToOneField(User)
	is_anonymous = models.BooleanField(default=True)
	DISEASE_CHOICES = (
		(0, 'Survivor'),
		(1, 'HIV'),
		(2, 'AIDS'),
		(3, 'None')
	)
	diseases = models.IntegerField(max_length = 1, choices = DISEASE_CHOICES)
	name = models.CharField(max_length = 100, blank = True)
	pseudonym = models.CharField(max_length = 100, blank = True)
	current_phone_number = models.CharField(max_length = 12)

class Chat(models.Model):
	users = models.ManyToManyField(User, 'the chat participants')

class Message(models.Model):
	chat = models.ForeignKey(Chat)
	sender = models.ForeignKey(User)
	content = models.TextField()

class Post(models.Model):
	community = models.ForeignKey(Community)
	poster = models.ForeignKey(User)
	upvotes = models.IntegerField(max_length = 5)
	flags = models.IntegerField(max_length = 5) # downvotes
	title = models.TextField()
	content = models.TextField()
	date_created = models.DateField()

class Community(models.Model):
	pass