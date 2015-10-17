from django import forms

class PostForm(forms.Form):

	content = forms.CharField(label = 'Have something to say?', max_length = 200)