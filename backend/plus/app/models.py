from django.db import models

# Create your models here.
class Profile(models.Model):
	id = models.AutoField(primary_key=True)
	is_anonymous = models.BooleanField(default=True)
	DISEASE_CHOICES = (
		(0, 'Survivor'),
		(1, 'HIV'),
		(2, 'AIDS')
	)
	diseases = models.IntegerField(max_length = 1, choices = DISEASE_CHOICES)
	name = models.CharField(max_length = 100, blank = True)
	pseudonym = models.CharField(max_length = 100, blank = True)