from twilio.rest import TwilioRestClient
from models import *

account = "AC175b368d4501eaed8369d53ea9276c96"
token = "e0fd5f063fa66e6f3541774f08cdea4f"
client = TwilioRestClient(account, token)

@csrf_exempt
def send_message(request):
    recipient = request.POST['recipient']
    content = request.POST['content']
    message = client.messages.create(to=recipient, from_="+14155992671", body=content)   
    return "Sent!"

@csrf_exempt
def receive_message(request):
    recipient = request.POST['recipient']
    sender_number = request.POST['sender']
    content = request.POST['content']
    matching_profile = models.Profile.objects.get(phone_number=sender_number)
    username = model.Users.find(where phone_num = sender)
    content = username + " says:\n" + content
    message = client.messages.create(to=recipient, from_="+14155992671", body=content)
    return "Sent!"
    
