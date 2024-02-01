from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    resp= HttpResponse("Hello world, Django!", content_type="text/plain")
    return resp
