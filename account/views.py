import json
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest


# Create your views here.
def home(request):
    return HttpResponse("Hello world, Django!")

def login(req: HttpRequest):
    # user login
    if req.method == "POST":
        body = json.loads(req.body.decode("utf-8"))
        ... 

def register(req: HttpRequest):
    # register, 
    if req.method == "POST":
        body = json.loads(req.body.decode("utf-8"))
        ... 
