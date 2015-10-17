from django.db import models

# Create your models here.
class User(models.Model):
	is_anonymous = models.BooleanField(default=True)
	DISEASE_CHOICES = (
		(0, 'Survivor'),
		(1, 'HIV'),
		(2, 'AIDS')
	)
	diseases = models.IntegerField(max_length = 1, choices = DISEASE_CHOICES)
	name = models.CharField(max_length = 100, blank = True)
	pseudonym = models.CharField(max_length = 100, blank = True)

class Chat(models.Model):
	users = models.ManyToManyField(User, 'the chat participants')

class Message(models.Model):
	chat = models.ForeignKey(Chat)
	sender = models.ForeignKey(User)
	content = models.TextField()