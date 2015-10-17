from django import forms
from django.forms import ModelForm
from models import Profile

class PostForm(forms.Form):

	content = forms.CharField(label = 'Have something to say?', max_length = 200)


class ProfileForm(forms.ModelForm):

	class Meta:

			model = Profile
			fields = ('user','is_anonymous','diseases','name','pseudonym','current_phone_number')

