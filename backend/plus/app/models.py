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
	diseases = models.IntegerField(choices = DISEASE_CHOICES)
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
	poster = models.ForeignKey(User)
	upvotes = models.IntegerField(default = 0)
	flags = models.IntegerField(default = 0) # downvotes
	title = models.TextField()
	content = models.TextField()
	date_created = models.DateField()

	def upVote(self):
		self.upvotes += 1
		self.save()
		
User.profile = property(lambda u: Profile.objects.get_or_create(user=u)[0])
# class Community(models.Model):
# 	pass

