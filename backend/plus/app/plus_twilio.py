from twilio.rest import TwilioRestClient
from django.http import JsonResponse
from models import *

account = "AC175b368d4501eaed8369d53ea9276c96"
token = "e0fd5f063fa66e6f3541774f08cdea4f"
client = TwilioRestClient(account, token)

def send_message(request):
    recipient = request.POST['recipient']
    sender = request.POST['sender']
    content = request.POST['content']

    sender_profile = Profile.objects.get(id=sender)
    # recipient_profile = Profile.objects.get(id=recipient)
    sender_name = sender_profile.pseudonym if sender_profile.is_anonymous else sender_profile.name

    content = sender_name + "says:\n" + content
    message = client.messages.create(to="+17034243826",
                                     recipient_profile.phone_number, from_="+14155992671", body=content)
    return JsonResponse({'message':"Sent!"})

def receive_message(request):
    recipient = request.POST['recipient']
    sender = request.POST['sender']
    content = request.POST['content']

    sender_profile = models.Profile.objects.get(phone_number=sender_number)
    recipient_profile = Profile.objects.get(id=recipient)
    sender_name = sender_profile.pseudonum if sender_profile.is_anonymous else sender_profile.name

    content = username + " says:\n" + content
    message = client.messages.create(to=recipient_profile.phone_number, from_="+14155992671", body=content)
    return JsonResponse({'message':"Sent!"})
    
