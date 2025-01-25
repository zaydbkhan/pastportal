from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, WaypointSerializer, ImageSerializer
from .models import User, Waypoint, Image

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class WaypointView(viewsets.ModelViewSet):
    serializer_class = WaypointSerializer
    queryset = Waypoint.objects.all()

class ImageView(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()